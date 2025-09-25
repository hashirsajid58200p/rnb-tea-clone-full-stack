import { createClient } from "@supabase/supabase-js";
import Stripe from "stripe";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method not allowed" });

  try {
    const { lineItems, customerEmail } = req.body;

    if (!lineItems || !customerEmail) {
      return res
        .status(400)
        .json({ error: "Missing lineItems or customerEmail" });
    }

    const baseUrl = `https://${process.env.VERCEL_URL || "rnb-tea-clone-full-stack.vercel.app"}`;
    const orderDetailsRaw = req.headers["x-order-details"] || "{}";
    const orderDetails = JSON.parse(orderDetailsRaw);
    const orderId = orderDetails.orderId || Math.floor(1000000000 + Math.random() * 9000000000);
    const successUrl = `${baseUrl}/thank-you?orderId=${orderId}`;
    const cancelUrl = `${baseUrl}/checkout`;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      customer_email: customerEmail,
      mode: "payment",
      success_url: successUrl,
      cancel_url: cancelUrl,
    });

    // Fetch customer details from Stripe (name is optional during checkout)
    const customerNameFromOrder = orderDetails.customerName || customerEmail.split('@')[0].replace(/\b\w/g, (c) => c.toUpperCase()).replace(/[^a-zA-Z\s]/g, ' ');
    const customer = await stripe.customers.create({
      email: customerEmail,
      name: customerNameFromOrder, // Use provided name or capitalized email prefix
    });
    const customerName = customer.name;

    const totalPrice = orderDetails.totalPrice
      ? parseFloat(orderDetails.totalPrice).toFixed(2)
      : "0.00";

    const transactionData = {
      orderId: orderId,
      customerName: customerName, // Use Stripe customer name
      customerEmail: customerEmail,
      basket: orderDetails.basket || [],
      totalPrice: totalPrice,
      trackingNumber: Math.floor(100000000000 + Math.random() * 900000000000), // Larger numeric tracking number (e.g., 322864404011)
      status: "pending",
      timestamp: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from("transactions")
      .insert([transactionData]);
    if (error) throw new Error(`Supabase Error: ${error.message}`);

    res.status(200).json({ id: session.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
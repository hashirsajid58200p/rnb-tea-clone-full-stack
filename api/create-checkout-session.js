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
    const customer = await stripe.customers.create({
      email: customerEmail,
      name: orderDetails.customerName || customerEmail.split('@')[0], // Use provided name or fallback to email prefix
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
      trackingNumber: Math.floor(100000 + Math.random() * 900000), // Numeric tracking number (e.g., 123456)
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
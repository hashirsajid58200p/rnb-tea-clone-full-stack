import { createClient } from "@supabase/supabase-js";
import Stripe from "stripe";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const { lineItems, customerEmail } = req.body;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      customer_email: customerEmail,
      mode: "payment",
      success_url: `${process.env.VERCEL_URL}/thank-you`,
      cancel_url: `${process.env.VERCEL_URL}/checkout`,
    });

    const orderDetailsRaw = req.headers["x-order-details"] || "{}";
    const orderDetails = JSON.parse(orderDetailsRaw);
    const totalPrice = orderDetails.totalPrice
      ? parseFloat(orderDetails.totalPrice).toFixed(2)
      : "0.00";

    const transactionData = {
      orderId: orderDetails.orderId || "N/A",
      customerEmail: customerEmail,
      basket: orderDetails.basket || [],
      totalPrice: totalPrice,
      status: "pending",
      timestamp: new Date().toISOString(),
    };

    const { data, error } = await supabase.from("transactions").insert([transactionData]);
    if (error) throw error;

    res.status(200).json({ id: session.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
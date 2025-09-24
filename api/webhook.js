import { createClient } from "@supabase/supabase-js";
import Stripe from "stripe";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const sig = req.headers["stripe-signature"];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;
  try {
    event = stripe.webhooks.constructEvent(await req.text(), sig, webhookSecret);
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    try {
      const { error } = await supabase
        .from("transactions")
        .update({ status: "completed", timestamp: new Date().toISOString() })
        .eq("id", session.id);
      if (error) throw error;
    } catch (error) {}
  } else if (event.type === "checkout.session.expired") {
    const session = event.data.object;
    try {
      const { error } = await supabase
        .from("transactions")
        .update({ status: "canceled", timestamp: new Date().toISOString() })
        .eq("id", session.id);
      if (error) throw error;
    } catch (error) {}
  }

  res.status(200).json({ received: true });
}
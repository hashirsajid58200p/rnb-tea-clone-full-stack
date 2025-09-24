import dotenv from "dotenv";
import express from "express";
import Stripe from "stripe";
import cors from "cors";
import { createClient } from "@supabase/supabase-js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const supabaseUrl =
  process.env.SUPABASE_URL || "https://fruqkfhrcdzymomvokhh.supabase.co";
const supabaseKey =
  process.env.SUPABASE_SERVICE_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZydXFrZmhyY2R6eW1vbXZva2hoIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1ODYyNTcxNywiZXhwIjoyMDc0MjAxNzE3fQ.VZ8kN5f2Q1hY6bC9jK3mL4nP0qR7sT8uI9oJ0kLmM2c";
const supabase = createClient(supabaseUrl, supabaseKey);

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

app.post("/create-checkout-session", async (req, res) => {
  try {
    const { lineItems, customerEmail } = req.body;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      customer_email: customerEmail,
      mode: "payment",
      success_url: "http://localhost:5173/thank-you",
      cancel_url: "http://localhost:5173/checkout",
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

    const { data, error } = await supabase
      .from("transactions")
      .insert([transactionData]);
    if (error) throw error;

    res.json({ id: session.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    const sig = req.headers["stripe-signature"];
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    let event;
    try {
      event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
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
);

app.listen(4242, () => {
  console.log("Server running on port 4242");
});

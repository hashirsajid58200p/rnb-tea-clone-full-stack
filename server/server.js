import dotenv from 'dotenv';
import express from 'express';
import Stripe from 'stripe';
import cors from 'cors';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Use the Stripe secret key from the .env file
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

app.post('/create-checkout-session', async (req, res) => {
  try {
    const { lineItems, customerEmail } = req.body;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      customer_email: customerEmail,
      mode: 'payment',
      success_url: 'http://localhost:3000/thank-you',
      cancel_url: 'http://localhost:3000/checkout',
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ error: 'Failed to create checkout session' });
  }
});

app.listen(4242, () => console.log('Server running on port 4242'));
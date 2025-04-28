import dotenv from 'dotenv';
import express from 'express';
import Stripe from 'stripe';
import cors from 'cors';
import admin from 'firebase-admin';
import serviceAccount from './serviceAccountKey.json' assert { type: 'json' };
const firebaseConfig = {
  apiKey: "AIzaSyDY9o467LFW_x073OT9Ao9vaEQ4SIWpYpQ",
  authDomain: "tea-project-3a349.firebaseapp.com",
  projectId: "tea-project-3a349",
  storageBucket: "tea-project-3a349.firebasestorage.app",
  messagingSenderId: "750483220898",
  appId: "1:750483220898:web:fed7d86306a011edbb6afb"
};
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const db = admin.firestore();

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

let stripe = null;

app.post('/create-checkout-session', async (req, res) => {
  try {
    const { lineItems, customerEmail } = req.body;

    console.log('Received lineItems:', lineItems);
    console.log('Received checkout request:', { lineItems, customerEmail });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems, // Correct parameter (note the underscore)
      customer_email: customerEmail,
      mode: 'payment',
      success_url: 'http://localhost:5173/thank-you',
      cancel_url: 'http://localhost:5173/checkout',
      
    });

    const orderDetailsRaw = req.headers['x-order-details'] || '{}';
    console.log('Raw x-order-details header:', orderDetailsRaw);

    const orderDetails = JSON.parse(orderDetailsRaw);
    console.log('Parsed order details:', orderDetails);

    const totalPrice = orderDetails.totalPrice ? parseFloat(orderDetails.totalPrice).toFixed(2) : '0.00';
    console.log('Extracted totalPrice:', totalPrice);

    const transactionData = {
      orderId: orderDetails.orderId || 'N/A',
      customerEmail: customerEmail,
      basket: orderDetails.basket || [],
      totalPrice: totalPrice,
      status: 'pending',
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
    };
    console.log('Saving transaction to Firestore:', transactionData);

    await db.collection('transactions').doc(session.id).set(transactionData);
    console.log('Transaction saved successfully with ID:', session.id);

    res.json({ id: session.id });
  } catch (error) {
    console.error('Error in /create-checkout-session:', error);
    res.status(500).json({ error: error.message });
  }
});

app.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
    console.log('Webhook event received:', event.type);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    console.log('Webhook: Checkout session completed for ID:', session.id);
    try {
      const transactionRef = db.collection('transactions').doc(session.id);
      const doc = await transactionRef.get();
      if (doc.exists) {
        await transactionRef.update({
          status: 'completed',
          timestamp: admin.firestore.FieldValue.serverTimestamp(),
        });
        console.log('Transaction status updated to completed for ID:', session.id);
      } else {
        console.log('Transaction not found in Firestore for ID:', session.id);
      }
    } catch (error) {
      console.error('Error updating transaction status to completed:', error);
    }
  } else if (event.type === 'checkout.session.expired') {
    const session = event.data.object;
    console.log('Webhook: Checkout session expired for ID:', session.id);
    try {
      const transactionRef = db.collection('transactions').doc(session.id);
      const doc = await transactionRef.get();
      if (doc.exists) {
        await transactionRef.update({
          status: 'canceled',
          timestamp: admin.firestore.FieldValue.serverTimestamp(),
        });
        console.log('Transaction status updated to canceled for ID:', session.id);
      } else {
        console.log('Transaction not found in Firestore for ID:', session.id);
      }
    } catch (error) {
      console.error('Error updating transaction status to canceled:', error);
    }
  } else {
    console.log('Unhandled webhook event type:', event.type);
  }

  res.status(200).json({ received: true });
});

app.listen(4242,async () =>{
  try{

    console.log('Server running on port 4242')

    stripe=await new Stripe("sk_test_51RDogoQpnjwWHWN6cmT9HcwrN8fUEv37EoOVNrje5HqwOnXXg2GAkCyluW5IIlQcPyYNAsqvj55KECfHgYQw2oOp00pJSZRE5Y");
    console.log(serviceAccount)
  }catch(error){
    console.log(error)
  }

} );
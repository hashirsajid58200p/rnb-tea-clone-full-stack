import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./ThankYou.css";
import Confetti from "react-confetti"; // Import Confetti
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client with Vite environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase =
  supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

const ThankYou = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [orderDetails, setOrderDetails] = useState({
    orderId: "N/A",
    trackingNumber: "N/A",
    customer: { name: "N/A", email: "N/A", phone: "" },
    basket: [],
    totalPrice: "0.00",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch order details from Supabase if orderId and supabase are present
    const fetchOrderDetails = async () => {
      const searchParams = new URLSearchParams(location.search);
      const orderIdFromUrl = searchParams.get("orderId");

      if (orderIdFromUrl && supabase) {
        try {
          const { data, error } = await supabase
            .from("transactions")
            .select("*")
            .eq("orderId", orderIdFromUrl)
            .single();
          if (data) {
            setOrderDetails({
              orderId: data.orderId,
              trackingNumber: data.trackingNumber || "N/A", // Use numeric tracking number from table
              customer: {
                name:
                  data.customerName ||
                  (data.customerEmail
                    ? data.customerEmail.split("@")[0]
                    : "N/A"), // Fallback if Stripe name not set
                email: data.customerEmail || "N/A",
                phone: data.customerPhone || "", // Placeholder for phone if added later
              },
              basket: data.basket || [],
              totalPrice: data.totalPrice || "0.00",
            });
          } else if (error) {
            setError(`Supabase Error: ${error.message}`);
          }
        } catch (err) {
          setError(`Fetch Error: ${err.message}`);
        } finally {
          setLoading(false);
        }
      } else if (!supabase) {
        setError(
          "Supabase not initialized. Ensure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set in your Vercel dashboard."
        );
        setLoading(false);
      } else {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [location.search]);

  const { orderId, trackingNumber, customer, basket, totalPrice } =
    orderDetails;

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div className="thank-you-container">
        <h1>Error</h1>
        <p>{error}</p>
        <button className="back-to-menu-btn" onClick={() => navigate("/menu")}>
          Back to Menu
        </button>
      </div>
    );
  }

  return (
    <div className="thank-you-container">
      <Confetti
        width={window.innerWidth}
        height={window.innerHeight}
        recycle={false}
        numberOfPieces={2500}
      />
      <h1>Thank You for Purchasing!</h1>
      <div className="receipt">
        <h2>Your Receipt</h2>
        <p>
          <strong>Order ID:</strong> {orderId}
        </p>
        <p>
          <strong>Tracking Number:</strong> {trackingNumber}
        </p>
        <p>
          <strong>Name:</strong> {customer.name}
        </p>
        <p>
          <strong>Email:</strong> {customer.email}
        </p>
        <h3>Order Details</h3>
        <ul>
          {basket.length > 0 ? (
            basket.map((item) => (
              <li key={item.id}>
                {item.name} - {item.quantity || 1} x ${item.price} = $
                {(item.price * (item.quantity || 1)).toFixed(2)}
              </li>
            ))
          ) : (
            <li>No items in order.</li>
          )}
        </ul>
        <p className="total">
          <strong>Total:</strong> ${totalPrice}
        </p>
      </div>
      <button className="back-to-menu-btn" onClick={() => navigate("/menu")}>
        Back to Menu
      </button>
    </div>
  );
};

export default ThankYou;

import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./ThankYou.css";
import Confetti from "react-confetti"; // Import Confetti
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client with environment variables and validation
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY;
const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

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
    // Log environment variables for debugging
    console.log("Supabase URL:", supabaseUrl);
    console.log("Supabase Key:", supabaseKey);

    // Get orderId from query params
    const searchParams = new URLSearchParams(location.search);
    const orderIdFromUrl = searchParams.get("orderId");
    console.log("OrderId from URL:", orderIdFromUrl);

    // Fetch order details from Supabase if orderId and supabase are present
    const fetchOrderDetails = async () => {
      if (orderIdFromUrl && supabase) {
        try {
          const { data, error } = await supabase
            .from("transactions")
            .select("*")
            .eq("orderId", orderIdFromUrl)
            .single();
          console.log("Fetched Order Details:", data, "Error:", error);
          if (data) {
            setOrderDetails({
              orderId: data.orderId,
              trackingNumber: "N/A", // Add logic to generate or fetch if needed
              customer: { name: data.customerEmail || "N/A", email: data.customerEmail || "N/A", phone: "" },
              basket: data.basket || [],
              totalPrice: data.totalPrice || "0.00",
            });
          } else if (error) {
            setError(`Supabase Error: ${error.message}`);
            console.error("Supabase Error:", error.message);
          }
        } catch (err) {
          setError(`Fetch Error: ${err.message}`);
          console.error("Fetch Error:", err.message);
        } finally {
          setLoading(false);
        }
      } else if (!supabase) {
        setError("Supabase not initialized. Check environment variables.");
        setLoading(false);
      } else {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [location.search]);

  const {
    orderId,
    trackingNumber,
    customer,
    basket,
    totalPrice,
  } = orderDetails;

  if (loading) {
    return <div>Loading...</div>; // Simple loading state to avoid white screen
  }

  if (error) {
    return <div>Error: {error}</div>; // Display error message if something goes wrong
  }

  return (
    <div className="thank-you-container">
      <Confetti
        width={window.innerWidth} // Full width of the window
        height={window.innerHeight} // Full height of the window
        recycle={false} // Stop confetti after initial burst
        numberOfPieces={2500} // Number of confetti pieces
      />
      <h1>Thank You for Purchasing!</h1>
      <div className="receipt">
        <h2>Your Receipt</h2>
        <p><strong>Order ID:</strong> {orderId}</p>
        <p><strong>Tracking Number:</strong> {trackingNumber}</p>
        <p><strong>Name:</strong> {customer.name}</p>
        <p><strong>Email:</strong> {customer.email}</p>
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
        <p className="total"><strong>Total:</strong> ${totalPrice}</p>
      </div>
      <button
        className="back-to-menu-btn"
        onClick={() => navigate("/menu")}
      >
        Back to Menu
      </button>
    </div>
  );
};

export default ThankYou;
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./ThankYou.css";
import Confetti from "react-confetti"; // Import Confetti

const ThankYou = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [orderDetails, setOrderDetails] = useState({});

  useEffect(() => {
    // Get orderId from query params
    const searchParams = new URLSearchParams(location.search);
    const orderIdFromUrl = searchParams.get("orderId");
    console.log("OrderId from URL:", orderIdFromUrl);

    // Try to retrieve from sessionStorage
    const orderDetailsRaw = sessionStorage.getItem("orderDetails");
    console.log("Retrieved from sessionStorage:", orderDetailsRaw);

    const details = orderDetailsRaw ? JSON.parse(orderDetailsRaw) : {};
    if (orderIdFromUrl && details.orderId === orderIdFromUrl) {
      setOrderDetails(details);
    } else if (orderDetailsRaw) {
      setOrderDetails(JSON.parse(orderDetailsRaw));
    }

    // Clear sessionStorage after reading
    sessionStorage.removeItem("orderDetails");
  }, [location.search]);

  const {
    orderId = "N/A",
    trackingNumber = "N/A",
    customer = {},
    basket = [],
    totalPrice = "0.00",
  } = orderDetails;

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
        <p>
          <strong>Order ID:</strong> {orderId}
        </p>
        <p>
          <strong>Tracking Number:</strong> {trackingNumber}
        </p>
        <p>
          <strong>Name:</strong> {customer.name || "N/A"}
        </p>
        <p>
          <strong>Email:</strong> {customer.email || "N/A"}
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

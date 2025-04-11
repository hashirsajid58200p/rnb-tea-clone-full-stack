// src/components/menu/order/ThankYou.jsx
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './ThankYou.css';

const ThankYou = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  // Default values if state is missing (e.g., direct navigation)
  const { orderId = 'N/A', customer = {}, basket = [], totalPrice = '0.00' } = state || {};

  return (
    <div className="thank-you-container">
      <h1>Thank You for Purchasing!</h1>
      <div className="receipt">
        <h2>Your Receipt</h2>
        <p><strong>Order ID:</strong> {orderId}</p>
        <p><strong>Name:</strong> {customer.name || 'N/A'}</p>
        <p><strong>Email:</strong> {customer.email || 'N/A'}</p>
        <p><strong>Phone:</strong> {customer.phone || 'N/A'}</p>
        <h3>Order Details</h3>
        <ul>
          {basket.length > 0 ? (
            basket.map((item) => (
              <li key={item.id}>
                {item.name} - {item.quantity || 1} x ${item.price} = ${(item.price * (item.quantity || 1)).toFixed(2)}
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
        onClick={() => navigate('/menu')}
      >
        Back to Menu
      </button>
    </div>
  );
};

export default ThankYou;
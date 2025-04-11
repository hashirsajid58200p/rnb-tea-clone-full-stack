// src/components/menu/order/OrderSummary.jsx
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./OrderSummary.css";
import { BasketContext } from "../../../context/BasketContext.jsx";

const OrderSummary = () => {
  const { basket, setBasket } = useContext(BasketContext);
  const navigate = useNavigate();
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const totalPrice = basket
    .reduce((sum, item) => sum + item.price * (item.quantity || 1), 0)
    .toFixed(2);

  const handleIncrease = (id) => {
    setBasket((prevBasket) =>
      prevBasket.map((item) =>
        item.id === id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
      )
    );
  };

  const handleDecrease = (id) => {
    setBasket((prevBasket) => {
      const item = prevBasket.find((item) => item.id === id);
      if (item.quantity > 1) {
        return prevBasket.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        );
      }
      return prevBasket.filter((item) => item.id !== id);
    });
  };

  const handleRemove = (id) => {
    setBasket((prevBasket) => prevBasket.filter((item) => item.id !== id));
  };

  const handlePurchaseClick = () => {
    setShowCheckoutForm(true);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      alert("Please fill in all fields.");
      return;
    }
    // Generate a random 10-digit order ID
    const orderId = Math.floor(1000000000 + Math.random() * 9000000000);
    // Navigate to thank-you page with order details
    navigate("/thank-you", {
      state: {
        orderId,
        customer: formData,
        basket,
        totalPrice,
      },
    });
    setBasket([]); // Clear basket
    setShowCheckoutForm(false);
    setFormData({ name: "", email: "", phone: "" });
  };

  return (
    <div className="order-summary-container">
      <h2>Your Order Summary</h2>
      <button className="back-btn" onClick={() => navigate("/menu")}>
        Back to Menu
      </button>
      {basket.length === 0 ? (
        <p>Your basket is empty.</p>
      ) : (
        <div className="order-summary-items">
          {basket.map((item) => (
            <div key={item.id} className="order-summary-item">
              <div className="item-details">
                <img src={item.image} alt={item.name} />
                <span>{item.name}</span>
                <span>${(item.price * (item.quantity || 1)).toFixed(2)}</span>
              </div>
              <div className="quantity-controls">
                <button onClick={() => handleDecrease(item.id)}>-</button>
                <span>{item.quantity || 1}</span>
                <button onClick={() => handleIncrease(item.id)}>+</button>
              </div>
              <button
                className="remove-btn"
                onClick={() => handleRemove(item.id)}
              >
                ×
              </button>
            </div>
          ))}
          <div className="total-price">
            <strong>Total: ${totalPrice}</strong>
          </div>
          <button className="purchase-btn" onClick={handlePurchaseClick}>
            Proceed to Purchase
          </button>

          {/* Checkout Form (Inline) */}
          {showCheckoutForm && (
            <div className="checkout-form">
              <h3>Enter Your Details</h3>
              <form onSubmit={handleFormSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleFormChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleFormChange}
                    required
                  />
                </div>
                <button type="submit" className="submit-btn">
                  Submit Order
                </button>
              </form>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default OrderSummary;

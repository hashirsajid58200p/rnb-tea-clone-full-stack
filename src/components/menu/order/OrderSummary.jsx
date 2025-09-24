import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./OrderSummary.css";
import { BasketContext } from "../../../context/BasketContext";

const OrderSummary = () => {
  const { basket, setBasket } = useContext(BasketContext);
  const navigate = useNavigate();

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

  const handleCheckout = () => {
    navigate("/checkout");
  };

  const handleDelete = () => {
    setBasket([]); // Clear the basket by setting it to an empty array
  };

  return (
    <div className="order-summary-container">
      {basket.length === 0 ? (
        <div className="empty-basket">
          <p>Your basket is empty.</p>
          <button className="back-btn" onClick={() => navigate("/menu")}>
            Back to Menu
          </button>
        </div>
      ) : (
        <div className="order-summary-layout">
          <div
            className={`order-images ${
              basket.length === 1 ? "single-item" : ""
            }`}
          >
            {basket.map((item) => (
              <img
                key={item.id}
                src={item.image}
                alt={item.name}
                className="order-image"
              />
            ))}
          </div>
          <div className="order-details">
            <h2>Your Order</h2>
            <div className="items-list">
              {basket.map((item) => (
                <div key={item.id} className="item-row">
                  <span>
                    {item.name} (x{item.quantity || 1})
                  </span>
                  <div className="item-controls">
                    <button onClick={() => handleDecrease(item.id)}>-</button>
                    <span>{item.quantity || 1}</span>
                    <button onClick={() => handleIncrease(item.id)}>+</button>
                    <button
                      className="remove-btn"
                      onClick={() => handleRemove(item.id)}
                    >
                      ×
                    </button>
                  </div>
                  <span>${(item.price * (item.quantity || 1)).toFixed(2)}</span>
                </div>
              ))}
              <div className="total-price">
                <strong>Total: ${totalPrice}</strong>
              </div>
            </div>
            <div className="button-group">
              <button className="checkout-btn" onClick={handleCheckout}>
                Checkout
              </button>
              <button className="deletedrinks-btn" onClick={handleDelete}>
                Remove All
              </button>
              <button className="back-btn" onClick={() => navigate("/menu")}>
                Back to Menu
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderSummary;
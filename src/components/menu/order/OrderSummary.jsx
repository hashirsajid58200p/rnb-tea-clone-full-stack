// src/menu/order/OrderSummary.jsx
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './OrderSummary.css';
import { BasketContext } from '../../../context/BasketContext';

const OrderSummary = () => {
  const { basket, setBasket } = useContext(BasketContext); // Use context
  const navigate = useNavigate();

  // Calculate total price
  const totalPrice = basket
    .reduce((sum, item) => sum + item.price * (item.quantity || 1), 0)
    .toFixed(2);

  // Increase item quantity
  const handleIncrease = (id) => {
    setBasket(prevBasket =>
      prevBasket.map(item =>
        item.id === id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
      )
    );
  };

  // Decrease item quantity (remove if it reaches 0)
  const handleDecrease = (id) => {
    setBasket(prevBasket => {
      const item = prevBasket.find(item => item.id === id);
      if (item.quantity > 1) {
        return prevBasket.map(item =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        );
      }
      return prevBasket.filter(item => item.id !== id);
    });
  };

  // Remove item entirely from basket
  const handleRemove = (id) => {
    setBasket(prevBasket => prevBasket.filter(item => item.id !== id));
  };

  // Handle purchase
  const handlePurchase = () => {
    alert('Purchase completed! Thank you for your order.');
    setBasket([]); // Clear basket
    navigate('/'); // Redirect back to DrinksMenu
  };

  return (
    <div className="order-summary-container">
      <h2>Your Order Summary</h2>
      <button
        className="back-btn"
        onClick={() => navigate('/')}
      >
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
          <button
            className="purchase-btn"
            onClick={handlePurchase}
          >
            Proceed to Purchase
          </button>
        </div>
      )}
    </div>
  );
};

export default OrderSummary;
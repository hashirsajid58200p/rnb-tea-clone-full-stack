// src/menu/Basket.jsx
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './Basket.css';
import { BasketContext } from '../../context/BasketContext';

const Basket = () => {
  const { basket } = useContext(BasketContext); // Use context
  const navigate = useNavigate();

  return (
    <div className="basket-container">
      <button
        className="basket-btn"
        onClick={() => navigate('/order')} // Redirect to OrderSummary
      >
        <span role="img" aria-label="basket">🧺</span>
        <span className="basket-count">{basket.length}</span>
      </button>
    </div>
  );
};

export default Basket;
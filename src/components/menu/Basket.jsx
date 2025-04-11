// src/components/menu/Basket.jsx
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './Basket.css';
import { BasketContext } from '../../context/BasketContext.jsx';

const Basket = () => {
  const { basket } = useContext(BasketContext);
  const navigate = useNavigate();

  return (
    <div className="basket-container">
      <button
        className="basket-btn"
        onClick={() => navigate('/order')}
      >
        <span role="img" aria-label="basket">🧺</span>
        <span className="basket-count">{basket.length}</span>
      </button>
    </div>
  );
};

export default Basket;
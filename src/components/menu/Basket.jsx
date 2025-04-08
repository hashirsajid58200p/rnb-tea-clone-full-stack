import React, { useState } from 'react';
import './Basket.css';

const Basket = ({ basket, setBasket }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // Calculate total price considering quantities
  const totalPrice = basket
    .reduce((sum, item) => sum + item.price * (item.quantity || 1), 0)
    .toFixed(2);

  // Increase item quantity
  const increaseQuantity = (id) => {
    setBasket(prevBasket =>
      prevBasket.map(item =>
        item.id === id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
      )
    );
  };

  // Decrease item quantity (remove if it reaches 0)
  const decreaseQuantity = (id) => {
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
  const removeFromBasket = (id) => {
    setBasket(prevBasket => prevBasket.filter(item => item.id !== id));
  };

  // Handle purchase (placeholder for now)
  const handlePurchase = () => {
    alert('Purchase completed! Thank you for your order.');
    setBasket([]); // Clear basket after purchase
    setIsPopupOpen(false); // Close popup
  };

  return (
    <div className="basket-container">
      {/* Basket Button - Position updated in CSS */}
      <button
        className="basket-btn"
        onClick={() => setIsPopupOpen(!isPopupOpen)}
      >
        <span role="img" aria-label="basket">🧺</span>
        <span className="basket-count">{basket.length}</span>
      </button>

      {/* Basket Popup */}
      {isPopupOpen && (
        <div className="basket-popup-overlay" onClick={() => setIsPopupOpen(false)}>
          <div className="basket-popup" onClick={(e) => e.stopPropagation()}>
            <h2>Your Basket</h2>
            {basket.length === 0 ? (
              <p>Your basket is empty.</p>
            ) : (
              <>
                <ul className="basket-items">
                  {basket.map((item) => (
                    <li key={item.id} className="basket-item">
                      <img src={item.image} alt={item.name} className="basket-item-img" />
                      <div className="basket-item-details">
                        <span>{item.name}</span>
                        <div className="quantity-controls">
                          <button
                            className="quantity-btn"
                            onClick={() => decreaseQuantity(item.id)}
                          >
                            -
                          </button>
                          <span>{item.quantity || 1}</span>
                          <button
                            className="quantity-btn"
                            onClick={() => increaseQuantity(item.id)}
                          >
                            +
                          </button>
                        </div>
                        <span>${(item.price * (item.quantity || 1)).toFixed(2)}</span>
                      </div>
                      <button
                        className="remove-btn"
                        onClick={() => removeFromBasket(item.id)}
                      >
                        ×
                      </button>
                    </li>
                  ))}
                </ul>
                <div className="basket-total">
                  <strong>Total: ${totalPrice}</strong>
                </div>
                <button className="purchase-btn" onClick={handlePurchase}>
                  Purchase
                </button>
              </>
            )}
            <button className="close-btn" onClick={() => setIsPopupOpen(false)}>
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Basket;
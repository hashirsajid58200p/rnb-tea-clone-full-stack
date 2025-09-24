import React from 'react';
import './Features.css';
import { FaClock, FaTags, FaBell, FaStar, FaGift, FaCreditCard } from 'react-icons/fa';

const Features = () => {
  return (
    <div className="features-outer-wrapper">
      <div className="features-wrapper">
        <h2 className="features-heading">Features</h2>
        <div className="features-grid">
          <div className="feature">
            <FaClock className="feature-icon" />
            <h3 className="feature-title">Skip the line</h3>
            <p className="feature-description">Order ahead on the app, no need to wait in-store</p>
          </div>
          <div className="feature">
            <FaTags className="feature-icon" />
            <h3 className="feature-title">Offers</h3>
            <p className="feature-description">Daily discounts on your favorite drinks</p>
          </div>
          <div className="feature">
            <FaBell className="feature-icon" />
            <h3 className="feature-title">Notifications</h3>
            <p className="feature-description">Keeping you updated on your orders</p>
          </div>
          <div className="feature">
            <FaStar className="feature-icon" />
            <h3 className="feature-title">Double points</h3>
            <p className="feature-description">When you order on the app</p>
          </div>
          <div className="feature">
            <FaGift className="feature-icon" />
            <h3 className="feature-title">Exclusive offers</h3>
            <p className="feature-description">You’ll hear about exclusive deals before anyone else</p>
          </div>
          <div className="feature">
            <FaCreditCard className="feature-icon" />
            <h3 className="feature-title">Payment options</h3>
            <p className="feature-description">Seamless payment options for you to choose</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;

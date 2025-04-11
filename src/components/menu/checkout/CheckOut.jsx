// src/components/menu/order/Checkout.jsx
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CheckOut.css';
import { BasketContext } from '../../../context/BasketContext.jsx';

const Checkout = () => {
  const { basket } = useContext(BasketContext);
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    country: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postalCode: '',
  });
  const [coupon, setCoupon] = useState('');

  const subtotal = basket
    .reduce((sum, item) => sum + item.price * (item.quantity || 1), 0)
    .toFixed(2);
  const shippingFee = step >= 2 ? 10 : 0;
  const discount = 0; // Placeholder for coupon logic
  const total = (parseFloat(subtotal) + shippingFee - discount).toFixed(2);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCouponChange = (e) => {
    setCoupon(e.target.value);
  };

  const applyCoupon = () => {
    alert('Coupon functionality not implemented yet.');
  };

  const handleContinueToShipping = () => {
    if (
      !formData.email ||
      !formData.country ||
      !formData.firstName ||
      !formData.lastName ||
      !formData.address ||
      !formData.city ||
      !formData.postalCode
    ) {
      alert('Please fill in all fields.');
      return;
    }
    setStep(2);
  };

  const handleBackToInformation = () => {
    setStep(1);
  };

  const handleContinueToPayment = () => {
    const orderId = Math.floor(1000000000 + Math.random() * 9000000000);
    navigate('/thank-you', {
      state: {
        orderId,
        trackingNumber: Math.floor(100000000000 + Math.random() * 900000000000), // 12 digits
        customer: {
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          phone: '',
        },
        basket,
        totalPrice: total,
      },
    });
  };

  return (
    <div className="checkout-container">
      <div className="checkout-form-side">
        <div className="progress-bar">
          <div className={step >= 1 ? 'step active' : 'step'}>
            <span className="circle">{step > 1 ? '✔' : '1'}</span>
            <span className="step-label">Information</span>
          </div>
          <div className="line" />
          <div className={step >= 2 ? 'step active' : 'step'}>
            <span className="circle">2</span>
            <span className="step-label">Shipping</span>
          </div>
          <div className="line" />
          <div className="step">
            <span className="circle">3</span>
            <span className="step-label">Payment</span>
          </div>
        </div>

        {step === 1 && (
          <div className="form-section">
            <h3>Contact</h3>
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

            <h3>Shipping Address</h3>
            <div className="form-group">
              <label htmlFor="country">Country</label>
              <input
                type="text"
                id="country"
                name="country"
                value={formData.country}
                onChange={handleFormChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleFormChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleFormChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleFormChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="city">City</label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleFormChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="postalCode">Postal Code</label>
              <input
                type="text"
                id="postalCode"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleFormChange}
                required
              />
            </div>
            <button
              className="continue-btn"
              onClick={handleContinueToShipping}
            >
              Continue to Shipping
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="form-section">
            <h3>Contact</h3>
            <p>{formData.email}</p>
            <h3>Shipping Address</h3>
            <p>
              {formData.firstName} {formData.lastName}
              <br />
              {formData.address}
              <br />
              {formData.city}, {formData.country} {formData.postalCode}
            </p>
            <div className="form-buttons">
              <button
                className="back-btn"
                onClick={handleBackToInformation}
              >
                Back to Information
              </button>
              <button
                className="continue-btn"
                onClick={handleContinueToPayment}
              >
                Continue to Payment
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="order-summary-side">
        <h2>Your Order</h2>
        {basket.map((item) => (
          <div key={item.id} className="order-item">
            <img src={item.image} alt={item.name} className="order-item-image" />
            <div className="order-item-details">
              <span>{item.name}</span>
              <span>x{item.quantity || 1}</span>
            </div>
          </div>
        ))}
        <div className="coupon-section">
          <input
            type="text"
            placeholder="Apply Coupon Code"
            value={coupon}
            onChange={handleCouponChange}
          />
          <button className="apply-coupon-btn" onClick={applyCoupon}>
            Apply
          </button>
        </div>
        <div className="order-totals">
          <div className="total-row">
            <span>Subtotal</span>
            <span>${subtotal}</span>
          </div>
          <div className="total-row">
            <span>Shipping</span>
            <span>${shippingFee.toFixed(2)}</span>
          </div>
          <div className="total-row">
            <span>Discount</span>
            <span>${discount.toFixed(2)}</span>
          </div>
          <div className="total-row total">
            <strong>Total</strong>
            <strong>${total}</strong>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
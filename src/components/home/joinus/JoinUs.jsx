import React, { useState, useEffect } from "react";
import "./JoinUs.css";

function JoinUs() {
  const [email, setEmail] = useState("");
  const [isPopupVisible, setPopupVisible] = useState(false);

  useEffect(() => {
    const hasSubscribed = localStorage.getItem("hasSubscribed");
    if (!hasSubscribed) {
      setPopupVisible(true);
    }
  }, []);

  const handleSubscribeClick = () => {
    setPopupVisible(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Subscribed with: ${email}`);
    localStorage.setItem("hasSubscribed", "true");
    setPopupVisible(false);
  };

  const closePopup = () => {
    setPopupVisible(false);
  };

  return (
    <div className="joinUsWrapper">
      <div className="joinUs-container">
        <h2 className="joinUs-heading">Join our Newsletter</h2>
        <p className="joinUs-paragraph">
          For the latest launches, exclusive promotions, and insider news!
        </p>
        <button className="joinUs-button" onClick={handleSubscribeClick}>
          Subscribe
        </button>
      </div>

      {isPopupVisible && (
        <div className="popup-overlay">
          <div className="popup-box">
            <button className="close-button" onClick={closePopup}>X</button>
            <h2 className="popup-heading">Subscribe to our Newsletter</h2>
            <p className="popup-paragraph">
              Stay updated with our latest launches and exclusive offers!
            </p>
            <form onSubmit={handleSubmit} className="popup-form">
              <input
                type="email"
                placeholder="Enter your email"
                className="popup-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className="popup-button">Subscribe</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default JoinUs;

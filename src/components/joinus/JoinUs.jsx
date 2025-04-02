import React, { useState } from "react";
import "./JoinUs.css";

function JoinUs() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can later handle the email submission here
    alert(`Subscribed with: ${email}`);
  };

  return (
    <div className="joinUsWrapper">
      <div className="joinUs-container">
        <h2 className="joinUs-heading">Join our Newsletter</h2>
        <p className="joinUs-paragraph">
          For the latest launches, exclusive promotions, and insider news!
        </p>
        <form onSubmit={handleSubmit} className="joinUs-form">
          <input
            type="email"
            placeholder="Enter your email"
            className="joinUs-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" className="joinUs-button">
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
}

export default JoinUs;
    
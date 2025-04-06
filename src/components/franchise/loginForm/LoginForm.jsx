import React, { useState } from 'react';
import './LoginForm.css'; // We'll define the styles in this CSS file.

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Email:', email, 'Password:', password);
  };

  return (
    <div className="login-form">
      <h2 className="login-header">Login to your Franchise Account</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email"
            className="input-field"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            className="input-field"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-button">Login</button>
      </form>
      <p className="forgot-password">
        <a href="/forgot-password">Forgot Password?</a>
      </p>
    </div>
  );
};

export default LoginForm;

import React, { useState } from "react";
import "./ContactForm.css";
import { Toaster, toast } from 'react-hot-toast';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() === '' || email.trim() === '' || message.trim() === '') {
      toast.error('Please fill in all fields');
      return;
    }
    toast.success('Details added successfully');
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <div className="contact-wrapper">
      <Toaster />
      <h2 className="contact-heading">Contact Us</h2>
      <form className="contact-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Your Name"
          className="contact-input"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Your Email"
          className="contact-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <textarea
          placeholder="Your Message"
          className="contact-textarea"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
        <button type="submit" className="contact-button">
          Send
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
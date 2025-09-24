import React from "react";
import { FaInstagram, FaFacebook, FaTiktok } from "react-icons/fa"; // We'll use react-icons for social media icons
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        {/* First Section: Contact info and Legal Links */}
        <div className="footer-contact">
          <p className="footer-email">Contact: info@rbteausa.com</p>
          <div className="footer-links">
            <a href="/terms" className="footer-link">Terms & Conditions</a>
            <a href="/privacy-policy" className="footer-link">Privacy Policy</a>
            <a href="/cookies-policy" className="footer-link">Cookies Policy</a>
            <a href="/brand-profile" className="footer-link">Brand Profile</a>
          </div>
        </div>

        {/* Divider Line */}
        <div className="divider"></div>

        {/* Second Section: Social Media and Newsletter */}
        <div className="footer-social">
          <h3 className="footer-heading">Follow Us</h3>
          <div className="footer-icons">
            <a href="https://instagram.com" className="footer-icon"><FaInstagram /></a>
            <a href="https://facebook.com" className="footer-icon"><FaFacebook /></a>
            <a href="https://tiktok.com" className="footer-icon"><FaTiktok /></a>
          </div>
          <button className="footer-newsletter-btn">Join Our Newsletter</button>
        </div>
      </div>

      {/* Copyright */}
      <div className="footer-bottom">
        <p>©Copyright 2019-2024 R&B Tea - All Rights Reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;

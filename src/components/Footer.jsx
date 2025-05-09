import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <h2>HempBrush</h2>
          <p>Brushing a greener tomorrow with every stroke.</p>
        </div>

        <div className="footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/shop">Shop</a></li>
            <li><a href="#why">Why Switch?</a></li>
            <li><a href="#reviews">Reviews</a></li>
          </ul>
        </div>

        <div className="footer-contact">
          <h4>Contact Us</h4>
          <p>Email: support@hempbrush.com</p>
          <p>Instagram: @hempbrush</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} HempBrush. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

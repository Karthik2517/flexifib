import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <h2 className="footer-logo">HempBrush</h2>
        <p className="footer-tagline">Eco-friendly brushes for a cleaner tomorrow.</p>
        <p className="footer-contact">support@hempbrush.com · @hempbrush</p>
        <p className="footer-copy">&copy; {new Date().getFullYear()} HempBrush</p>
      </div>
    </footer>
  );
};

export default Footer;

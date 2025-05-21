import React from 'react';
import '../styles/Footer.css';
// If you use icon libraries like FontAwesome or React Icons:
// import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer" id="contact">
      <div className="footer-content">
        <h2 className="footer-logo">FlexiFib</h2> {/* Updated from HempBrush to FlexiFib to match navbar */}
        <p className="footer-tagline">Eco-friendly brushes for a cleaner tomorrow.</p>
        
        <div className="footer-contact">
          <h3 className="footer-contact-heading">Get in Touch</h3>
          <p>
            <a href="mailto:support@flexifib.com">support@flexifib.com</a>
          </p>
          {/* You can add more contact details like a phone number if needed */}
          {/* <p>@flexifib_social</p> */}
        </div>

        {/* Placeholder for social media icons - uncomment and use actual icons/links */}
        {/*
        <div className="footer-socials">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <FaFacebook /> {}
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <FaInstagram /> {}
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
            <FaTwitter /> {}
          </a>
        </div>
        */}
        
        <p className="footer-copy">&copy; {new Date().getFullYear()} FlexiFib. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
import React, { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/Success.css';

const Success = () => {
  const { clearCart } = useCart();
  const location = useLocation();

  useEffect(() => {
    // Clear cart once payment is confirmed
    clearCart();
    window.scrollTo(0, 0);
  }, [clearCart]);

  // Extract session ID if present
  const query = new URLSearchParams(location.search);
  const sessionId = query.get('session_id');

  return (
    <div className="success-page">
      <Navbar />

      <main className="success-main">
        <div className="success-card">
          <div className="success-icon-wrap">
            <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          </div>

          <span className="success-badge">Payment Successful</span>
          <h1>Thank You for Choosing Sustainable</h1>
          <p className="success-desc">
            Your order has been placed successfully. We've sent an order confirmation with your receipt and tracking details to your email.
          </p>

          {sessionId && (
            <div className="session-ref">
              <span>Order Reference:</span>
              <code>{sessionId.slice(0, 24)}...</code>
            </div>
          )}

          <div className="eco-impact-box">
            <div className="eco-leaf-icon">🌿</div>
            <div>
              <h4>Your Eco Impact</h4>
              <p>Your purchase supports 100% biodegradable hemp materials and eliminates single-use plastic pollution.</p>
            </div>
          </div>

          <div className="success-actions">
            <Link to="/" className="success-home-btn">
              Continue Shopping
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Success;

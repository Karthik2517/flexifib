import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import '../styles/CartDrawer.css';

const FREE_SHIPPING_THRESHOLD = 20;

const CartDrawer = () => {
  const {
    items,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    totalCount,
    subtotal
  } = useCart();

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Handle ESC key to close drawer
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isCartOpen) {
        closeCart();
      }
    };
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
      setErrorMessage('');
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isCartOpen, closeCart]);

  const handleCheckout = async () => {
    setIsLoading(true);
    setErrorMessage('');

    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items }),
      });

      const contentType = response.headers.get('content-type') || '';
      let data = {};

      if (contentType.includes('application/json')) {
        data = await response.json();
      } else {
        const rawText = await response.text();
        if (rawText.includes('<!DOCTYPE') || rawText.includes('<html')) {
          throw new Error(
            'The API serverless function is not running locally. When deployed to Vercel with STRIPE_SECRET_KEY, checkout will connect automatically.'
          );
        }
        throw new Error(rawText || 'Unable to connect to Stripe checkout.');
      }

      if (!response.ok || !data.url) {
        throw new Error(data.error || 'Unable to create checkout session.');
      }

      // Redirect user to secure Stripe checkout page
      window.location.href = data.url;
    } catch (error) {
      console.error('Checkout error:', error);
      setErrorMessage(
        error.message || 'Something went wrong while connecting to checkout. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const progressPercent = Math.min(
    100,
    Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100)
  );
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  return (
    <div className={`cart-drawer-wrapper ${isCartOpen ? 'open' : ''}`}>
      {/* Backdrop overlay */}
      <div className="cart-backdrop" onClick={closeCart} aria-hidden="true" />

      {/* Slide-out panel */}
      <aside
        className="cart-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Shopping Cart"
      >
        {/* Header */}
        <div className="cart-header">
          <div className="cart-title-wrap">
            <h2>Your Cart</h2>
            <span className="cart-badge-count">{totalCount} {totalCount === 1 ? 'item' : 'items'}</span>
          </div>
          <button
            className="cart-close-btn"
            onClick={closeCart}
            aria-label="Close cart"
          >
            <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Free Shipping Progress */}
        <div className="cart-shipping-bar">
          <p className="shipping-text">
            {remainingForFreeShipping > 0 ? (
              <>Add <strong>£{remainingForFreeShipping.toFixed(2)}</strong> more for <strong>Free Eco Shipping</strong></>
            ) : (
              <span className="free-shipping-unlocked">🎉 You unlocked <strong>Free Eco Shipping</strong>!</span>
            )}
          </p>
          <div className="progress-track">
            <div
              className="progress-fill"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Content Body */}
        <div className="cart-body">
          {items.length === 0 ? (
            <div className="cart-empty-state">
              <div className="empty-cart-icon">
                <svg viewBox="0 0 24 24" width="56" height="56" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <path d="M16 10a4 4 0 0 1-8 0"></path>
                </svg>
              </div>
              <h3>Your cart is empty</h3>
              <p>Explore our sustainable hemp products crafted for everyday living.</p>
              <a
                href="#shop"
                className="cart-shop-btn"
                onClick={closeCart}
              >
                Start Shopping
              </a>
            </div>
          ) : (
            <ul className="cart-items-list">
              {items.map((item) => (
                <li key={item.id} className="cart-item">
                  <div className="item-image">
                    <img src={item.image} alt={item.title} />
                  </div>
                  <div className="item-details">
                    <div className="item-top">
                      <h4 className="item-title">{item.title}</h4>
                      <button
                        className="item-remove-btn"
                        onClick={() => removeFromCart(item.id)}
                        aria-label={`Remove ${item.title}`}
                      >
                        <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="3 6 5 6 21 6"></polyline>
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        </svg>
                      </button>
                    </div>
                    <span className="item-price">£{(item.numericPrice || 5).toFixed(2)}</span>
                    <div className="item-actions">
                      <div className="quantity-controls">
                        <button
                          className="qty-btn"
                          onClick={() => updateQuantity(item.id, -1)}
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <span className="qty-number">{item.quantity}</span>
                        <button
                          className="qty-btn"
                          onClick={() => updateQuantity(item.id, 1)}
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                      <span className="item-total-price">
                        £{((item.numericPrice || 5) * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="cart-footer">
            {errorMessage && (
              <div className="cart-error-alert" role="alert">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                </svg>
                <span>{errorMessage}</span>
              </div>
            )}

            <div className="cart-subtotal-row">
              <span>Subtotal</span>
              <span className="subtotal-amount">£{subtotal.toFixed(2)}</span>
            </div>
            <p className="cart-shipping-note">
              Taxes & carbon-neutral shipping calculated at checkout
            </p>
            <div className="cart-eco-tag">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              </svg>
              <span>100% Biodegradable & Plastic-Free Delivery</span>
            </div>
            <button
              className="checkout-btn"
              onClick={handleCheckout}
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="checkout-loading-wrap">
                  <span className="checkout-spinner" />
                  Connecting to Secure Checkout...
                </span>
              ) : (
                `Proceed to Checkout • £${subtotal.toFixed(2)}`
              )}
            </button>
            <button className="cart-clear-link" onClick={clearCart} disabled={isLoading}>
              Clear Cart
            </button>
          </div>
        )}
      </aside>
    </div>
  );
};

export default CartDrawer;

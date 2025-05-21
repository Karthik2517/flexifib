import React, { useState, useEffect } from 'react';
import '../styles/Navbar.css';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    // Cleanup function to remove the event listener
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); // Empty dependency array means this effect runs once on mount and cleanup on unmount

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false); // Close mobile menu on link click
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''} ${isMobileMenuOpen ? 'mobile-menu-active' : ''}`}>
      {/* Wrapped the logo div in an anchor tag */}
      <a href="#home" className="logo-link" onClick={handleLinkClick}>
        <div className="logo">FlexiFib</div>
      </a>

      <ul className={`nav-links ${isMobileMenuOpen ? 'open' : ''}`}>
        <li><a href="#home" onClick={handleLinkClick}>Home</a></li>
        <li><a href="#why" onClick={handleLinkClick}>Why Switch?</a></li>
        <li><a href="#shop" onClick={handleLinkClick}>Shop</a></li>
        <li><a href="#story" onClick={handleLinkClick}>Our Story</a></li>
        <li><a href="#reviews" onClick={handleLinkClick}>Reviews</a></li>
        <li><a href="#contact" onClick={handleLinkClick}>Contact</a></li>
      </ul>

      <button
        className={`mobile-menu-icon ${isMobileMenuOpen ? 'open' : ''}`}
        onClick={toggleMobileMenu}
        aria-label="Toggle menu"
        aria-expanded={isMobileMenuOpen}
      >
        <span className="icon-bar"></span>
        <span className="icon-bar"></span>
        <span className="icon-bar"></span>
      </button>
      {isMobileMenuOpen && <div className="mobile-menu-backdrop" onClick={toggleMobileMenu}></div>}
    </nav>
  );
};

export default Navbar;
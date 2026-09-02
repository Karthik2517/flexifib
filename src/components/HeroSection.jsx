import React from 'react';
import '../styles/HeroSection.css';
import heroImg from '../assets/hero-bg3.jpg';
import heroMobileImg from '../assets/hero-bg-mobile.jpg';

const HeroSection = () => {
  return (
    <section 
      className="hero-section" 
      aria-label="Hero" 
      style={{ 
        '--hero-bg-desktop': `url(${heroImg})`,
        '--hero-bg-mobile': `url(${heroMobileImg})`
      }}
    >
      <span className="hero-leaf hero-leaf-1" aria-hidden="true">
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M32 4C18 14 8 28 8 42c0 8 6 14 14 14 4 0 7-1.5 10-4-3 1-6 1-9-1 9-1 16-6 20-14 3-6 4-13 4-21-6 3-11 8-14 14 1-11-1-21-1-26z"
            fill="currentColor"
          />
        </svg>
      </span>
      <span className="hero-leaf hero-leaf-2" aria-hidden="true">
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M32 4C18 14 8 28 8 42c0 8 6 14 14 14 4 0 7-1.5 10-4-3 1-6 1-9-1 9-1 16-6 20-14 3-6 4-13 4-21-6 3-11 8-14 14 1-11-1-21-1-26z"
            fill="currentColor"
          />
        </svg>
      </span>

      <div className="hero-content">
        <h1 className="hero-title">Rooted in Nature. Crafted for Living.</h1>
        <p className="hero-subtitle">Eco-friendly hemp products crafted for a cleaner planet and a sustainable lifestyle.</p>
        {/* Changed button to an anchor tag to navigate to the #shop section */}
        <a href="#shop" className="hero-button">Shop Now</a>
      </div>

      <a href="#why" className="hero-scroll-cue" aria-label="Scroll to learn more">
        <span className="hero-scroll-chevron" />
      </a>
    </section>
  );
};

export default HeroSection;
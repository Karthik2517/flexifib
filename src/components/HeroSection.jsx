import React from 'react';
import '../styles/HeroSection.css';
import heroImg from '../assets/hero-bg2.png';

const HeroSection = () => {
  return (
    <div className="hero-section" style={{ backgroundImage: `url(${heroImg})` }}>
      <div className="hero-content">
        <h1>Brush Better. Live Cleaner.</h1>
        <p>Eco-friendly hemp brushes crafted for a cleaner planet and a brighter smile.</p>
        {/* Changed button to an anchor tag to navigate to the #shop section */}
        <a href="#shop" className="hero-button">Shop Now</a>
      </div>
    </div>
  );
};

export default HeroSection;
import React from 'react';
import '../styles/WhySwitch.css';
import { useReveal } from '../hooks/useReveal';

// Icon imports
import biodegradableIcon from '../assets/icons/biodegradable.png';
import plasticFreeIcon from '../assets/icons/plastic-free.png';
import safeIcon from '../assets/icons/safe.png';
import carbonIcon from '../assets/icons/footprint.png';

// Comparison images
import brushTheChangeImg from '../assets/image1.jpeg';
import repackageTheFutureImg from '../assets/image2.jpeg';
import tissueImg from '../assets/image3.jpeg';

const benefits = [
  { title: '100% Biodegradable', description: 'Made from natural hemp fibers, our brushes return to the earth without harming it.', icon: biodegradableIcon },
  { title: 'Plastic-Free', description: 'No microplastics, no pollution — just clean design and a clean conscience.', icon: plasticFreeIcon },
  { title: 'Safe for You', description: 'Gentle on gums, tough on plaque. No chemicals, no compromises.', icon: safeIcon },
  { title: 'Low Carbon Footprint', description: 'Hemp is fast-growing and carbon-negative — good for you and the planet.', icon: carbonIcon },
];

const comparisonImages = [
  { src: tissueImg, alt: 'FlexiFib Tissue vs Conventional Tissue' },
  { src: brushTheChangeImg, alt: 'FlexiFib HempBrush vs Conventional Toothbrush Comparison' },
  { src: repackageTheFutureImg, alt: 'Hemp Based Packaging Solutions' },
];

const WhySwitch = () => {
  const [sectionRef, isVisible] = useReveal({ threshold: 0.1 });

  return (
    <section
      className={`why-switch reveal-parent ${isVisible ? 'visible' : ''}`}
      id="why"
      ref={sectionRef}
    >
      <h2>Why Make the Switch?</h2>
      <p className="switch-intro">
        Plastic toothbrushes take centuries to decompose. Our hemp brushes are made to be used guilt-free —
        they're sustainable, safe, and stylish.
      </p>

      <div className="switch-grid">
        {benefits.map((benefit, index) => (
          <div className="stagger-item" style={{ '--i': index }} key={index}>
            <div className="switch-card">
              <img src={benefit.icon} alt={benefit.title} className="switch-icon" />
              <h3>{benefit.title}</h3>
              <p>{benefit.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="visual-comparison-images-container">
        <h3 className="visual-comparison-heading">A Clearer Choice</h3>
        <div className="images-flex-grid">
          {comparisonImages.map((img, index) => (
            <div className="stagger-item" style={{ '--i': benefits.length + index }} key={index}>
              <div className="comparison-image-wrapper">
                <img src={img.src} alt={img.alt} loading="lazy" decoding="async" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhySwitch;
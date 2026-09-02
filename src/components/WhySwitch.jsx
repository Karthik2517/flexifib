import React from 'react';
import '../styles/WhySwitch.css';
import { useReveal } from '../hooks/useReveal';

// Icon imports
import biodegradableIcon from '../assets/icons/biodegradable.png';
import plasticFreeIcon from '../assets/icons/plastic-free.png';
import safeIcon from '../assets/icons/safe.png';
import carbonIcon from '../assets/icons/footprint.png';

// Comparison images
import brushComparisonImg from '../assets/image1.jpeg';
import tissueComparisonImg from '../assets/image3.jpeg';
import packagingComparisonImg from '../assets/image2.jpeg';

const benefits = [
  { 
    title: '100% Biodegradable', 
    description: 'Made from natural hemp fibers, our products return to the earth without harming it.', 
    icon: biodegradableIcon 
  },
  { 
    title: 'Plastic-Free', 
    description: 'No microplastics, no pollution — just clean design and a clean conscience.', 
    icon: plasticFreeIcon 
  },
  { 
    title: 'Safe for You', 
    description: 'Gentle on gums, tough on plaque. No chemicals, no compromises.', 
    icon: safeIcon 
  },
  { 
    title: 'Low Carbon Footprint', 
    description: 'Hemp is fast-growing and carbon-negative — good for you and the planet.', 
    icon: carbonIcon 
  },
];

const comparisonItems = [
  {
    id: 'brush-comp',
    badge: 'Zero Microplastics',
    title: 'Hemp Brush vs. Plastic Waste',
    metric: 'Decomposes in 6 Months',
    vsMetric: 'vs. 500+ Years in Landfills',
    description: 'Natural hemp handles biodegrade seamlessly, unlike traditional plastic toothbrushes that clog oceans for centuries.',
    image: brushComparisonImg,
    alt: 'FlexiFib Sustainable Hemp Brush vs Single-Use Plastic Waste'
  },
  {
    id: 'tissue-comp',
    badge: '100% Tree-Free',
    title: 'Hemp Fiber vs. Bleached Paper',
    metric: '4x Higher Yield per Acre',
    vsMetric: 'vs. Deforestation Paper Pulp',
    description: 'Unbleached organic hemp yields soft, durable tissue without destroying vital forest ecosystems.',
    image: tissueComparisonImg,
    alt: 'FlexiFib Unbleached Hemp Tissue vs Conventional Bleached Paper'
  },
  {
    id: 'packaging-comp',
    badge: 'Fully Compostable',
    title: 'Hemp Kraft vs. Plastic Wrap',
    metric: '100% Bio-based Material',
    vsMetric: 'vs. Non-Recyclable Synthetic Wrap',
    description: 'Crafted from renewable hemp stalks, our packaging offers robust protection with zero plastic footprint.',
    image: packagingComparisonImg,
    alt: 'FlexiFib Sustainable Hemp Kraft Packaging vs Synthetic Plastic Wrap'
  }
];

const WhySwitch = () => {
  const [sectionRef, isVisible] = useReveal({ threshold: 0.1 });

  return (
    <section
      className={`why-switch reveal-parent ${isVisible ? 'visible' : ''}`}
      id="why"
      ref={sectionRef}
    >
      <div className="section-header">
        <span className="section-eyebrow">The Sustainable Difference</span>
        <h2>Why Make the Switch?</h2>
        <p className="switch-intro">
          Plastic toothbrushes and synthetic packaging take centuries to decompose. Our hemp products are thoughtfully engineered to deliver uncompromising performance while protecting the planet.
        </p>
      </div>

      {/* Core Benefits Grid */}
      <div className="switch-grid">
        {benefits.map((benefit, index) => (
          <div className="stagger-item" style={{ '--i': index }} key={index}>
            <div className="switch-card">
              <div className="switch-icon-wrapper">
                <img src={benefit.icon} alt={benefit.title} className="switch-icon" />
              </div>
              <h3>{benefit.title}</h3>
              <p>{benefit.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Modern "A Clearer Choice" Section */}
      <div className="visual-comparison-container">
        <div className="comparison-header">
          <span className="comparison-badge-subtitle">Side-by-Side Impact</span>
          <h3 className="visual-comparison-heading">A Clearer Choice</h3>
          <p className="comparison-description">
            See how choosing FlexiFib directly eliminates plastic pollution and protects natural resources.
          </p>
        </div>

        <div className="modern-comparison-grid">
          {comparisonItems.map((item, index) => (
            <div 
              className="stagger-item" 
              style={{ '--i': benefits.length + index }} 
              key={item.id}
            >
              <div className="modern-comparison-card">
                <div className="comparison-image-container">
                  <img src={item.image} alt={item.alt} loading="lazy" decoding="async" />
                  <span className="glass-badge">{item.badge}</span>
                </div>
                <div className="comparison-card-content">
                  <h4>{item.title}</h4>
                  <div className="comparison-metrics">
                    <span className="metric-green">{item.metric}</span>
                    <span className="metric-muted">{item.vsMetric}</span>
                  </div>
                  <p>{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhySwitch;
import React, { useEffect, useRef, useState } from 'react';
import '../styles/WhySwitch.css';

// Original icon imports
import biodegradableIcon from '../assets/icons/biodegradable.png';
import plasticFreeIcon from '../assets/icons/plastic-free.png';
import safeIcon from '../assets/icons/safe.png';
import carbonIcon from '../assets/icons/footprint.png';

// TODO: Add your new comparison images to the assets folder and update these paths
import brushTheChangeImg from '../assets/image1.jpeg'; // Example path from your uploaded files
import repackageTheFutureImg from '../assets/image2.jpeg'; // Example path
import tissueImg from '../assets/image3.jpeg';

const benefits = [
  { title: '100% Biodegradable', description: 'Made from natural hemp fibers, our brushes return to the earth without harming it.', icon: biodegradableIcon },
  { title: 'Plastic-Free', description: 'No microplastics, no pollution — just clean design and a clean conscience.', icon: plasticFreeIcon },
  { title: 'Safe for You', description: 'Gentle on gums, tough on plaque. No chemicals, no compromises.', icon: safeIcon },
  { title: 'Low Carbon Footprint', description: 'Hemp is fast-growing and carbon-negative — good for you and the planet.', icon: carbonIcon },
];

const WhySwitch = () => {
  const sectionRef = useRef(null); // Use this ref for the main section
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = sectionRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(element);
        }
      },
      { threshold: 0.1 } // Lower threshold to trigger sooner
    );

    observer.observe(element);

    return () => {
      if (element) { // Check if element still exists
        observer.unobserve(element);
      }
    };
  }, []);


  return (
    // The 'visible' class will be added here by the IntersectionObserver
    <section
      className={`why-switch ${isVisible ? 'visible' : ''}`}
      id="why"
      ref={sectionRef}
    >
      <h2>Why Make the Switch?</h2>
      <p className="switch-intro">
        Plastic toothbrushes take centuries to decompose. Our hemp brushes are made to be used guilt-free —
        they’re sustainable, safe, and stylish.
      </p>
      
      {/* Existing benefits grid */}
      <div className="switch-grid">
        {benefits.map((benefit, index) => (
          <div className="switch-card" key={index}>
            <img src={benefit.icon} alt={benefit.title} className="switch-icon" />
            <h3>{benefit.title}</h3>
            <p>{benefit.description}</p>
          </div>
        ))}
      </div>

      {/* NEW SECTION FOR SIDE-BY-SIDE COMPARISON IMAGES */}
      <div className="visual-comparison-images-container">
        <h3 className="visual-comparison-heading">A Clearer Choice</h3>
        <div className="images-flex-grid">
        <div className="comparison-image-wrapper">
            <img src={tissueImg} alt="FlexiFib Tissue vs Conventional Tissue" />
            {/* Optional caption: <p className="image-caption">HempBrush Advantages</p> */}
          </div>
          <div className="comparison-image-wrapper">
            <img src={brushTheChangeImg} alt="FlexiFib HempBrush vs Conventional Toothbrush Comparison" />
            {/* Optional caption: <p className="image-caption">HempBrush Advantages</p> */}
          </div>
          <div className="comparison-image-wrapper">
            <img src={repackageTheFutureImg} alt="Hemp Based Packaging Solutions" />
            {/* Optional caption: <p className="image-caption">Sustainable Packaging</p> */}
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default WhySwitch;
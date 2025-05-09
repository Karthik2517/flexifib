import React, { useEffect, useRef, useState } from 'react';
import '../styles/WhySwitch.css';
import biodegradableIcon from '../assets/icons/biodegradable.png';
import plasticFreeIcon from '../assets/icons/plastic-free.png';
import safeIcon from '../assets/icons/safe.png';
import carbonIcon from '../assets/icons/footprint.png';

const benefits = [
  { title: '100% Biodegradable', description: 'Made from natural hemp fibers, our brushes return to the earth without harming it.', icon: biodegradableIcon },
  { title: 'Plastic-Free', description: 'No microplastics, no pollution — just clean design and a clean conscience.', icon: plasticFreeIcon },
  { title: 'Safe for You', description: 'Gentle on gums, tough on plaque. No chemicals, no compromises.', icon: safeIcon },
  { title: 'Low Carbon Footprint', description: 'Hemp is fast-growing and carbon-negative — good for you and the planet.', icon: carbonIcon },
];

const WhySwitch = () => {
  const ref = useRef();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
  
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.3 }
    );
  
    if (element) observer.observe(element);
  
    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);
  

  return (
    <section className={`why-switch ${visible ? 'visible' : ''}`} id="why" ref={ref}>
      <h2>Why Make the Switch?</h2>
      <p className="switch-intro">
        Plastic toothbrushes take centuries to decompose. Our hemp brushes are made to be used guilt-free —
        they’re sustainable, safe, and stylish.
      </p>
      <div className="switch-grid">
        {benefits.map((benefit, index) => (
          <div className="switch-card" key={index}>
            <img src={benefit.icon} alt={benefit.title} className="switch-icon" />
            <h3>{benefit.title}</h3>
            <p>{benefit.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhySwitch;

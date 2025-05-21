import React from 'react';
import HeroSection from '../components/HeroSection';
import ProductCard from '../components/ProductCard';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WhySwitch from '../components/WhySwitch';
import '../styles/Home.css';

import brush1 from '../assets/brush1.png';
import brush2 from '../assets/brush2.png';
import brush3 from '../assets/brush3.png';

const products = [
  {
    id: 1,
    title: 'Soft Touch',
    subtitle: 'Charcoal Bristles',
    price: '$6',
    image: brush1
  },
  {
    id: 2,
    title: 'Original',
    subtitle: 'Natural Bristles',
    price: '$6',
    image: brush2
  },
  {
    id: 3,
    title: 'Firm Grip',
    subtitle: 'White Bristles',
    price: '$6',
    image: brush3
  }
];

const Home = () => {
  return (
    <div className="home-page">
      <Navbar />

      <section id="home">
        <HeroSection />
      </section>

      <WhySwitch />

      <section id="shop" className="product-section scroll-target-section">
        <h2>Meet Our Hemp Brush Lineup</h2>
        <p className="section-intro">
          Browse our selection of eco-friendly hemp brushes. More exciting products coming soon!
        </p>
        <div className="product-grid">
          {products.map(product => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </section>

      <section id="story" className="content-section scroll-target-section">
        <h2>Our Story</h2>
        <p>Content about our story coming soon...</p>
        <p>We started FlexiFib with a mission to reduce plastic waste...</p>
      </section>

      <section id="reviews" className="content-section scroll-target-section">
        <h2>Reviews</h2>
        <p>What our customers are saying...</p>
        <div className="review-item">
          <p>"Absolutely love these brushes! So gentle and eco-friendly." - Jane D.</p>
        </div>
        <div className="review-item">
          <p>"Finally, a sustainable toothbrush that actually works well." - John S.</p>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Home;
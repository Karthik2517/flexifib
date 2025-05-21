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

      {/* OUR STORY SECTION - Rolled back to simple paragraph structure */}
      <section id="story" className="content-section scroll-target-section">
        <h2>Our Story</h2>
        <p className="story-paragraph-original">
          At FlexiFib, our passion for a healthier planet is matched only by our commitment to your well-being.
          We believe that the products we use daily should be a reflection of our values – and for us,
          that means sustainability, quality, and a deep respect for nature.
        </p>
        <p className="story-paragraph-original">
          We saw a world awash in plastic, and a growing desire among people like us for alternatives
          that didn't force a compromise between personal care and environmental responsibility.
          Why should something as fundamental as brushing our teeth contribute to centuries of waste?
          This question fueled our resolve.
        </p>
        <p className="story-paragraph-original">
          Our journey led us to the remarkable hemp plant. Its natural strength, rapid renewability,
          and minimal ecological footprint made it the clear choice for our flagship product.
          Hemp allows us to craft brushes that are not only durable and effective but also fully
          biodegradable, returning to the earth without leaving a trace.
        </p>
        <p className="story-paragraph-original">
          From the moment FlexiFib was conceived, our guiding principle has been "eco-friendly without compromise."
          This means meticulous attention to detail, from sourcing sustainable materials to ensuring our
          brushes provide a superior clean. We are dedicated to transparency, innovation, and creating
          products you can trust and feel good about using.
        </p>
        <p className="story-paragraph-original">
          FlexiFib is more than a brand; it's a community of conscious consumers. We're excited to continue
          exploring innovative ways to reduce plastic waste in our daily lives, one thoughtfully designed
          product at a time. Join us in creating a future where sustainability and self-care go hand in hand.
        </p>
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
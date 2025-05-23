import React from 'react';
import HeroSection from '../components/HeroSection';
import ProductCard from '../components/ProductCard';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WhySwitch from '../components/WhySwitch'; // Assuming WhySwitch is now stable
import '../styles/Home.css';

// Image imports - ensure these paths are correct
import brush1 from '../assets/brush1.png';
import brush2 from '../assets/brush2.png';
import brush3 from '../assets/brush3.png';

const products = [
  {
    id: 1,
    title: 'Brush',
    price: '£5', // Corrected from $ to £ as per your latest products data
    image: brush1
  },
  {
    id: 2,
    title: 'Tissue',
    price: '£5', // Corrected
    image: brush2
  },
  {
    id: 3,
    title: 'Packaging',
    price: '£5', // Corrected
    image: brush3
  }
];

const Home = () => {
  // Removed the storyPoints array as we are reverting to simple paragraphs for #story

  return (
    <div className="home-page">
      <Navbar />

      <section id="home">
        <HeroSection />
      </section>

      <WhySwitch />

      <section id="shop" className="product-section scroll-target-section">
        <h2>Our Flagship Products</h2> {/* Changed from "Meet Our Hemp Brush Lineup" to "Our Products" as per your JSX */}
        <p className="section-intro">
          Browse our selection of eco-friendly hemp products. More exciting products coming soon!
        </p>
        <div className="product-grid">
          {products.map(product => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </section>

      {/* OUR STORY SECTION - REVERTED TO YOUR PROVIDED SIMPLE PARAGRAPH STRUCTURE */}
      <section id="story" className="content-section scroll-target-section story-section-basic">
        <h2>Our Story</h2>
        <p className="story-paragraph-basic">
          At FlexiFib, our passion for a healthier planet is matched only by our commitment to your well-being.
          We believe that the products we use daily should be a reflection of our values – and for us,
          that means sustainability, quality, and a deep respect for nature.
        </p>
        <p className="story-paragraph-basic">
          We saw a world awash in plastic, and a growing desire among people like us for alternatives
          that didn't force a compromise between personal care and environmental responsibility.
          Why should something as fundamental as brushing our teeth contribute to centuries of waste?
          This question fueled our resolve.
        </p>
        <p className="story-paragraph-basic">
          Our journey led us to the remarkable hemp plant. Its natural strength, rapid renewability,
          and minimal ecological footprint made it the clear choice for our flagship product.
          Hemp allows us to craft brushes that are not only durable and effective but also fully
          biodegradable, returning to the earth without leaving a trace.
        </p>
        <p className="story-paragraph-basic">
          From the moment FlexiFib was conceived, our guiding principle has been "eco-friendly without compromise."
          This means meticulous attention to detail, from sourcing sustainable materials to ensuring our
          brushes provide a superior clean. We are dedicated to transparency, innovation, and creating
          products you can trust and feel good about using.
        </p>
        <p className="story-paragraph-basic">
          FlexiFib is more than a brand; it's a community of conscious consumers. We're excited to continue
          exploring innovative ways to reduce plastic waste in our daily lives, one thoughtfully designed
          product at a time. Join us in creating a future where sustainability and self-care go hand in hand.
        </p>
      </section>

      {/* REVIEWS SECTION */}
      <section id="reviews" className="content-section scroll-target-section reviews-section">
        <h2>What Our Customers Are Saying</h2>
        <p className="section-intro reviews-intro">
          We love our community! Here’s how FlexiFib is making a difference.
        </p>
        <div className="reviews-grid">
          {/* Reviews content ... */}
          <div className="review-card">
            <p className="review-text"></p>
            <p className="review-author"></p>
          </div>
          <div className="review-card">
            <p className="review-text"></p>
            <p className="review-author"></p>
          </div>
          <div className="review-card">
            <p className="review-text"></p>
            <p className="review-author"></p>
          </div>
          <div className="review-card">
            <p className="review-text"></p>
            <p className="review-author"></p>
          </div>
          <div className="review-card">
            <p className="review-text"></p>
            <p className="review-author"></p>
          </div>
          <div className="review-card">
            <p className="review-text"></p>
            <p className="review-author"></p>
          </div>
          
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Home;
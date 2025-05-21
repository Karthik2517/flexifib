import React from 'react';
import HeroSection from '../components/HeroSection';
import ProductCard from '../components/ProductCard';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WhySwitch from '../components/WhySwitch'; // WhySwitch already has its own section tag and id
import '../styles/Home.css'; // Styles for Home page layout and new sections

// Image imports - ensure these paths are correct
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

// Placeholder Section Style (can be moved to Home.css or a separate CSS file)
const sectionStyle = {
  padding: '4rem 2rem',
  textAlign: 'center',
  minHeight: '60vh', // Ensure sections have some height for scrolling
  borderTop: '1px solid #eee'
};

const Home = () => {
  return (
    <div className="home-page">
      <Navbar />

      {/* HeroSection is the target for #home, it should be at the very top */}
      <section id="home">
        <HeroSection />
      </section>

      {/* WhySwitch component already renders a <section> with id="why" */}
      {/* We will target its id directly in CSS or ensure it has the scroll-target-section class if needed */}
      <WhySwitch /> 

      <section id="shop" className="product-section scroll-target-section">
        <h2>Meet Our Hemp Brush Lineup</h2>
        <p style={{ marginBottom: '2rem', fontSize: '1.1rem', color: '#555' }}>
          Browse our selection of eco-friendly hemp brushes. More exciting products coming soon!
        </p>
        <div className="product-grid">
          {products.map(product => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </section>

      <section id="story" style={sectionStyle} className="scroll-target-section">
        <h2>Our Story</h2>
        <p>Content about our story coming soon...</p>
        <p>We started FlexiFib with a mission to reduce plastic waste...</p>
      </section>

      <section id="reviews" style={sectionStyle} className="scroll-target-section">
        <h2>Reviews</h2>
        <p>What our customers are saying...</p>
        <div style={{ marginTop: '2rem', border: '1px dashed #ccc', padding: '1rem' }}>
          <p>"Absolutely love these brushes! So gentle and eco-friendly." - Jane D.</p>
        </div>
        <div style={{ marginTop: '1rem', border: '1px dashed #ccc', padding: '1rem' }}>
          <p>"Finally, a sustainable toothbrush that actually works well." - John S.</p>
        </div>
      </section>

      {/* Footer component renders a <footer> with id="contact" */}
      {/* We will target its id directly in CSS or ensure it has the scroll-target-section class if needed */}
      <Footer />
    </div>
  );
};

export default Home;
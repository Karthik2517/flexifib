import React from 'react';
import HeroSection from '../components/HeroSection';
import ProductCard from '../components/ProductCard';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/Home.css';
import brush1 from '../assets/brush1.png';
import brush2 from '../assets/brush2.png';
import brush3 from '../assets/brush3.png';
import WhySwitch from '../components/WhySwitch';

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
      <HeroSection />
      <WhySwitch /> 
      <section className="product-section">
        <h2>Meet Our Hemp Brush Lineup</h2>
        <div className="product-grid">
          {products.map(product => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Home;

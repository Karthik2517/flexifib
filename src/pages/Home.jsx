import React from 'react';
import HeroSection from '../components/HeroSection';
import ProductCard from '../components/ProductCard';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ScrollProgress from '../components/ScrollProgress';
import WhySwitch from '../components/WhySwitch';
import { useReveal } from '../hooks/useReveal';
import '../styles/Home.css';

// Image imports
import brush1 from '../assets/brush1.png';
import brush2 from '../assets/brush2.png';
import brush3 from '../assets/brush3.png';

const products = [
  {
    id: 1,
    title: 'Hemp Brush',
    subtitle: 'Naturally antibacterial bristles for a superior clean.',
    price: '£5',
    image: brush1
  },
  {
    id: 2,
    title: 'Hemp Tissue',
    subtitle: 'Soft, sustainable tissue that decomposes in weeks.',
    price: '£5',
    image: brush2
  },
  {
    id: 3,
    title: 'Hemp Packaging',
    subtitle: 'Plastic-free packaging that returns to the earth.',
    price: '£5',
    image: brush3
  }
];

const reviews = [
  {
    text: "I switched to FlexiFib three months ago and I'll never go back. The bristles are gentle yet effective, and knowing my brush won't sit in a landfill for centuries is a huge relief.",
    author: '— Sarah M.'
  },
  {
    text: "Honestly, I was sceptical at first — a hemp toothbrush? But the quality blew me away. It feels premium and my dentist even noticed my gums look healthier.",
    author: '— James R.'
  },
  {
    text: "As someone who's trying to reduce plastic in every area of life, FlexiFib was a no-brainer. Beautiful packaging, great product, and a company that genuinely cares.",
    author: '— Priya K.'
  },
  {
    text: "My whole family uses FlexiFib now. The kids love the feel of the bristles, and I love that we're teaching them about sustainability through everyday choices.",
    author: '— Tom & Lisa D.'
  },
  {
    text: "The hemp tissue is surprisingly soft — better than most mainstream brands. Plus it composts in my garden! Absolutely brilliant.",
    author: '— Amara O.'
  },
  {
    text: "I've gifted FlexiFib brushes to everyone I know. It sparks such great conversations about sustainable living. The quality speaks for itself.",
    author: '— David C.'
  }
];

const Home = () => {
  const [shopRef, shopVisible] = useReveal();
  const [storyRef, storyVisible] = useReveal();
  const [reviewsRef, reviewsVisible] = useReveal();

  return (
    <div className="home-page">
      <ScrollProgress />
      <Navbar />

      <section id="home">
        <HeroSection />
      </section>

      <main id="main-content">
        <WhySwitch />

        <section
          id="shop"
          className={`product-section scroll-target-section reveal-parent ${shopVisible ? 'visible' : ''}`}
          ref={shopRef}
        >
          <h2>Our Flagship Products</h2>
          <p className="section-intro">
            Browse our selection of eco-friendly hemp products. More exciting products coming soon!
          </p>
          <div className="product-grid">
            {products.map((product, i) => (
              <div className="stagger-item" style={{ '--i': i }} key={product.id}>
                <ProductCard {...product} />
              </div>
            ))}
          </div>
        </section>

        {/* OUR STORY SECTION */}
        <section
          id="story"
          className={`content-section scroll-target-section story-section-basic reveal-parent ${storyVisible ? 'visible' : ''}`}
          ref={storyRef}
        >
          <h2>Our Story</h2>
          <p className="story-paragraph-basic stagger-item" style={{ '--i': 0 }}>
            At FlexiFib, our passion for a healthier planet is matched only by our commitment to your well-being.
            We believe that the products we use daily should be a reflection of our values — and for us,
            that means sustainability, quality, and a deep respect for nature.
          </p>
          <p className="story-paragraph-basic stagger-item" style={{ '--i': 1 }}>
            We saw a world awash in plastic, and a growing desire among people like us for alternatives
            that didn't force a compromise between personal care and environmental responsibility.
            Why should something as fundamental as brushing our teeth contribute to centuries of waste?
            This question fuelled our resolve.
          </p>
          <p className="story-paragraph-basic stagger-item" style={{ '--i': 2 }}>
            Our journey led us to the remarkable hemp plant. Its natural strength, rapid renewability,
            and minimal ecological footprint made it the clear choice for our flagship product.
            Hemp allows us to craft brushes that are not only durable and effective but also fully
            biodegradable, returning to the earth without leaving a trace.
          </p>
          <p className="story-paragraph-basic stagger-item" style={{ '--i': 3 }}>
            From the moment FlexiFib was conceived, our guiding principle has been "eco-friendly without compromise."
            This means meticulous attention to detail, from sourcing sustainable materials to ensuring our
            brushes provide a superior clean. We are dedicated to transparency, innovation, and creating
            products you can trust and feel good about using.
          </p>
          <p className="story-paragraph-basic stagger-item" style={{ '--i': 4 }}>
            FlexiFib is more than a brand; it's a community of conscious consumers. We're excited to continue
            exploring innovative ways to reduce plastic waste in our daily lives, one thoughtfully designed
            product at a time. Join us in creating a future where sustainability and self-care go hand in hand.
          </p>
        </section>

        {/* REVIEWS SECTION */}
        <section
          id="reviews"
          className={`content-section scroll-target-section reviews-section reveal-parent ${reviewsVisible ? 'visible' : ''}`}
          ref={reviewsRef}
        >
          <h2>What Our Customers Are Saying</h2>
          <p className="section-intro reviews-intro">
            We love our community! Here's how FlexiFib is making a difference.
          </p>
          <div className="reviews-grid">
            {reviews.map((review, i) => (
              <div className="stagger-item" style={{ '--i': i }} key={i}>
                <div className="review-card">
                  <p className="review-text">{review.text}</p>
                  <p className="review-author">{review.author}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
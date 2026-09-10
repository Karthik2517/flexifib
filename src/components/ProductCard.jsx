import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import '../styles/ProductCard.css';

const ProductCard = ({ id, title, subtitle, price, image }) => {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart({ id, title, subtitle, price, image });
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1200);
  };

  return (
    <div className="product-card">
      <div className="image-wrapper">
        <img src={image} alt={title} loading="lazy" decoding="async" />
      </div>
      <h3>{title}</h3>
      <p>{subtitle}</p>
      <span>{price}</span>
      <button
        className={`add-to-cart-btn ${isAdded ? 'added' : ''}`}
        onClick={handleAddToCart}
        aria-label={`Add ${title} to cart`}
      >
        {isAdded ? 'Added ✓' : 'Add to Cart'}
      </button>
    </div>
  );
};

export default ProductCard;

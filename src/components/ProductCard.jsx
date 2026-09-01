import React from 'react';
import '../styles/ProductCard.css';

const ProductCard = ({ title, subtitle, price, image }) => {
  return (
    <div className="product-card">
      <div className="image-wrapper">
        <img src={image} alt={title} loading="lazy" decoding="async" />
      </div>
      <h3>{title}</h3>
      <p>{subtitle}</p>
      <span>{price}</span>
      <button className="add-to-cart-btn" aria-label={`Add ${title} to cart`}>
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;

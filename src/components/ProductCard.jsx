import React from 'react';
import '../styles/ProductCard.css';

const ProductCard = ({ title, subtitle, price, image }) => {
  return (
    <div className="product-card">
      <div className="image-wrapper">
        <img src={image} alt={title} />
      </div>
      <h3>{title}</h3>
      <p>{subtitle}</p>
      <span>{price}</span>
      <button>Add to Cart</button>
    </div>
  );
};

export default ProductCard;

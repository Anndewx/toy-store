// src/ProductCard.js

import React from 'react';
import './MainPage.css';

const ProductCard = ({ product, onAddToCart }) => {
  const renderStars = (rating) => Array.from({ length: 5 }, (_, i) => <i key={i} className={`fas fa-star ${i < rating ? 'filled' : ''}`}></i>);
  return (
    <div className="product-card">
      {product.onSale && <div className="sale-badge">SALE</div>}
      {product.isNew && <div className="new-badge">NEW</div>}
      {product.isPopular && <div className="popular-badge">POPULAR</div>}
      <div className="product-image-container"><img src={product.image} alt={product.name} className="product-image" /></div>
      <div className="product-details">
        <h3 className="product-name">{product.name}</h3>
        <div className="product-rating">{renderStars(product.rating)}</div>
        <div className="product-price">
          {product.originalPrice ? (
            <><span className="original-price">${product.originalPrice}</span><span className="current-price">${product.price}</span></>
          ) : <span className="current-price">${product.price}</span>}
        </div>
        <button className="add-to-cart-btn" onClick={() => onAddToCart(product)}><i className="fas fa-cart-plus"></i> Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductCard;
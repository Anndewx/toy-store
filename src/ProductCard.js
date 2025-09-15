// src/ProductCard.js

import React from 'react';
import { Link } from 'react-router-dom';
import './MainPage.css';

const ProductCard = ({ product, onAddToCart }) => {
    const renderStars = (rating) =>
        Array.from({ length: 5 }, (_, i) => (
            <i
                key={i}
                className={`fas fa-star ${i < rating ? 'filled' : ''}`}
            ></i>
        ));

    return (
        <div className="product-card">
            {product.onSale && <div className="sale-badge">SALE</div>}

            <Link to={`/products/${product.id}`} className="product-link">
                <div className="product-image-container">
                    {/* แก้ไขตรงนี้ให้ใช้ image_url */}
                    <img src={product.image} alt={product.name} className="product-image" />
                </div>
            </Link>

            <div className="product-details">
                <Link to={`/products/${product.id}`} className="product-link">
                    <h3 className="product-name">{product.name}</h3>
                </Link>

                <div className="product-rating">{renderStars(product.rating)}</div>
                
                <div className="price-and-cart">
                    <div className="product-price">
                        {product.originalPrice ? (
                            <>
                                <span className="original-price">${product.originalPrice}</span>
                                <span className="current-price">${product.price}</span>
                            </>
                        ) : (
                            <span className="current-price">${product.price}</span>
                        )}
                    </div>
                    <button className="add-to-cart-btn" onClick={() => onAddToCart(product)}>
                        <i className="fas fa-cart-plus"></i> Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
// src/NewArrivalsPage.js

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "./MainPage.css";

// Reusable Components
const CartModal = ({ isOpen, onClose, cartItems, removeFromCart, getTotalPrice }) => {
    if (!isOpen) return null;
    return (
        <div className="cart-modal-overlay" onClick={onClose}>
            <div className="cart-modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="cart-modal-header">
                    <h2><i className="fas fa-shopping-cart"></i> Your Cart</h2>
                    <button className="close-button" onClick={onClose}>&times;</button>
                </div>
                <div className="cart-modal-body">
                    {cartItems.length === 0 ? (
                        <div className="empty-cart">
                            <i className="fas fa-box-open"></i>
                            <h3>Your cart is empty</h3>
                            <p>Looks like you haven't added anything yet.</p>
                        </div>
                    ) : (
                        cartItems.map((item) => (
                            <div key={item.id} className="cart-item">
                                <img src={item.image} alt={item.name} className="cart-item-image" />
                                <div className="cart-item-details">
                                    <h4>{item.name}</h4>
                                    <p>Qty: {item.quantity}</p>
                                </div>
                                <div className="cart-item-price">${(item.price * item.quantity).toFixed(2)}</div>
                                <button className="remove-button" onClick={() => removeFromCart(item.id)}>
                                    <i className="fas fa-trash-alt"></i>
                                </button>
                            </div>
                        ))
                    )}
                </div>
                {cartItems.length > 0 && (
                    <div className="cart-modal-footer">
                        <div className="total-price">
                            <h3>Total:</h3>
                            <h2>${getTotalPrice()}</h2>
                        </div>
                        <button className="checkout-button">Proceed to Checkout</button>
                    </div>
                )}
            </div>
        </div>
    );
};

const ProductCard = ({ product, onAddToCart }) => {
    const renderStars = (rating) => Array.from({ length: 5 }, (_, i) => <i key={i} className={`fas fa-star ${i < rating ? 'filled' : ''}`}></i>);
    return (
        <div className="product-card">
            {product.isNew && <div className="new-badge">NEW</div>}
            <div className="product-image-container"><img src={product.image} alt={product.name} className="product-image" /></div>
            <div className="product-details">
                <h3 className="product-name">{product.name}</h3>
                <div className="product-rating">{renderStars(product.rating)}</div>
                <div className="product-price"><span className="current-price">${product.price}</span></div>
                <button className="add-to-cart-btn" onClick={() => onAddToCart(product)}><i className="fas fa-cart-plus"></i> Add to Cart</button>
            </div>
        </div>
    );
};

function NewArrivalsPage() {
    const [cartItems, setCartItems] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const navigate = useNavigate();
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');

    const handleLogout = () => {
        localStorage.removeItem('currentUser');
        navigate('/login');
    };

    const newArrivals = [
        { id: 13, name: "Batman x Deadpool", price: 58.28, image: "/images/superhero1.jpg", rating: 5, isNew: true },
        { id: 14, name: "Baby Groot", price: 39.78, image: "/images/superhero.jpg", rating: 4, isNew: true },
        { id: 15, name: "Izuku Midoriya", price: 27.44, image: "/images/anime3.jpg", rating: 5, isNew: true },
        { id: 16, name: "Master Chief Halo", price: 39.78, image: "/images/game.jpg", rating: 4, isNew: true }
    ];

    const addToCart = (product) => {
        setCartItems(prev => {
            const exist = prev.find(item => item.id === product.id);
            if (exist) {
                return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
            }
            return [...prev, { ...product, quantity: 1 }];
        });
    };

    const removeFromCart = (id) => setCartItems(prev => prev.filter(item => item.id !== id));
    const getTotalItems = () => cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const getTotalPrice = () => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);

    return (
        <div className="main-page-wrapper">
            <Navbar 
                currentUser={currentUser}
                totalCartItems={getTotalItems()}
                onCartClick={() => setIsCartOpen(true)}
                onLogout={handleLogout}
            />

            <header className="page-header">
                <h1 className="page-title">New Arrivals</h1>
                <p className="page-subtitle">Be the first to own the latest collectibles!</p>
            </header>

            <main className="product-section">
                <div className="product-grid">
                    {newArrivals.map((product) => (
                        <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
                    ))}
                </div>
            </main>

            <Footer />

            <CartModal
                isOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)}
                cartItems={cartItems}
                removeFromCart={removeFromCart}
                getTotalPrice={getTotalPrice}
            />
        </div>
    );
}

export default NewArrivalsPage;

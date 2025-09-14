// src/NewArrivalsPage.js

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "./MainPage.css";
// นำเข้าคอมโพเนนต์ที่สร้างใหม่
import CartModal from './CartModal';
import ProductCard from './ProductCard';

function NewArrivalsPage() {
    const [cartItems, setCartItems] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const navigate = useNavigate();
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');

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

    const navigateToCheckout = () => {
      setIsCartOpen(false); // Close the modal before navigating
      navigate("/checkout", { state: { cartItems: cartItems } });
    };

    return (
        <div className="main-page-wrapper">
            <Navbar 
                currentUser={currentUser}
                totalCartItems={getTotalItems()}
                onCartClick={() => setIsCartOpen(true)}
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
                navigateToCheckout={navigateToCheckout}
            />
        </div>
    );
}

export default NewArrivalsPage;
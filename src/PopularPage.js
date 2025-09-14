// src/PopularPage.js

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "./MainPage.css";
// นำเข้าคอมโพเนนต์ที่สร้างใหม่
import CartModal from './CartModal';
import ProductCard from './ProductCard';

function PopularPage() {
    const [cartItems, setCartItems] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const navigate = useNavigate();
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');

    const popularProducts = [
        { id: 1, name: "MG 1/100 GUNDAM EXIA", price: 61.36, originalPrice: 92.20, image: "/images/gundam.jpg", onSale: true, rating: 5, isPopular: true },
        { id: 2, name: "MSN-04 Sazabi", price: 70.61, originalPrice: 98.67, image: "/images/gundam1.jpg", onSale: true, rating: 5, isPopular: true },
        { id: 6, name: "Stormtrooper", price: 30.53, originalPrice: 52.11, image: "/images/superhero2.jpg", onSale: true, rating: 5, isPopular: true },
        { id: 9, name: "Asuka Langley Soryu", price: 46.22, originalPrice: 55.19, image: "/images/anime2.jpg", onSale: true, rating: 5, isPopular: true }
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
                <h1 className="page-title">Popular Items</h1>
                <p className="page-subtitle">Discover our fan-favorite and best-selling toys!</p>
            </header>
    
            <main className="product-section">
                <div className="product-grid">
                    {popularProducts.map((product) => (
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

export default PopularPage;
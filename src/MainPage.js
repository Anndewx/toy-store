// src/MainPage.js

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MainPage.css"; 
import Navbar from './Navbar';
import Footer from './Footer';
import CartModal from './CartModal';
import ProductCard from './ProductCard';
import heroBackgroundImage from './images/hero-background.jpg';

function MainPage() {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');

  const products = [
    { id: 1, name: "MG 1/100 GUNDAM EXIA", price: 61.36, originalPrice: 92.20, image: "/images/gundam.jpg", onSale: true, rating: 5},
    { id: 2, name: "MSN-04 Sazabi", price: 70.61, originalPrice: 98.67, image: "/images/gundam1.jpg", onSale: true, rating: 5 },
    { id: 3, name: "Gundam Astray Red Frame", price: 53.96, originalPrice: 89.11, image: "/images/gundam2.jpg", onSale: true, rating: 5 },
    { id: 4, name: "Baby Groot", price: 39.78, image: "/images/superhero.jpg", onSale: false, rating: 4 },
    { id: 5, name: "Batman x Deadpool", price: 58.28, image: "/images/superhero1.jpg", onSale: false, rating: 5 },
    { id: 6, name: "Stormtrooper", price: 30.53, originalPrice: 52.11, image: "/images/superhero2.jpg", onSale: true, rating: 5 },
    { id: 7, name: "Yamato", price: 10.79, image: "/images/anime.jpg", onSale: false, rating: 2 },
    { id: 8, name: "Rem", price: 24.36, image: "/images/anime1.jpg", onSale: false, rating: 4 },
    { id: 9, name: "Asuka Langley Soryu", price: 46.22, originalPrice: 55.19, image: "/images/anime2.jpg", onSale: true, rating: 5 },
    { id: 10, name: "Izuku Midoriya", price: 27.44, image: "/images/anime3.jpg", onSale: false, rating: 4 },
    { id: 11, name: "Halo", price: 39.78, image: "/images/game.jpg", onSale: false, rating: 3 },
    { id: 12, name: "Super Mario", price: 18.19, originalPrice: 49.03, image: "/images/game1.jpg", onSale: true, rating: 4 }
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
    setIsCartOpen(false);
    navigate("/checkout", { state: { cartItems: cartItems } });
  };
  
  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/login');
  };

  return (
    <div className="main-page-wrapper">
      <Navbar 
        currentUser={currentUser}
        totalCartItems={getTotalItems()}
        onCartClick={() => setIsCartOpen(true)}
        onLogout={handleLogout}
      />

      <header 
        className="hero-section" 
        style={{ backgroundImage: `url(${heroBackgroundImage})` }}
      >
        <div className="hero-content">
          <h1 className="hero-title">Welcome to Your Toy Paradise</h1>
          <p className="hero-subtitle">Curated Collectibles from the Worlds You Love</p>
        </div>
      </header>
      
      <main className="product-section">
        <h2 className="section-title">Our Featured Products</h2>
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard 
              key={product.id}
              product={product}
              onAddToCart={addToCart}
            />
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

export default MainPage;
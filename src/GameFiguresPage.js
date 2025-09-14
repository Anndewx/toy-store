import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import CartModal from "./CartModal";
import ProductCard from "./ProductCard";
import "./MainPage.css"; // ใช้ CSS ไฟล์เดียวกับหน้าหลัก

function GameFiguresPage() {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "null");

  const gameFigures = [
    { id: 20, name: "Master Chief Halo", price: 39.78, image: "/images/game.jpg", onSale: false, rating: 4 },
    { id: 21, name: "Super Mario", price: 18.19, originalPrice: 49.03, image: "/images/game1.jpg", onSale: true, rating: 4 },
    { id: 22, name: "Link - Zelda", price: 45.99, image: "/images/game.jpg", onSale: false, rating: 5 },
    { id: 23, name: "Kratos - God of War", price: 52.50, originalPrice: 65.00, image: "/images/game1.jpg", onSale: true, rating: 5 },
    { id: 24, name: "Sonic the Hedgehog", price: 28.99, image: "/images/game.jpg", onSale: false, rating: 4 },
    { id: 25, name: "Pikachu Pokemon", price: 35.75, image: "/images/game1.jpg", onSale: false, rating: 5 }
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
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  return (
    <div className="main-page-wrapper">
      <Navbar
        currentUser={currentUser}
        totalCartItems={getTotalItems()}
        onCartClick={() => setIsCartOpen(true)}
        onLogout={handleLogout}
      />
      
      <header className="page-header">
        <h1 className="page-title">Game Figures</h1>
        <p className="page-subtitle">Iconic Characters from Your Favorite Games</p>
      </header>

      <main className="product-section">
        <div className="product-grid">
          {gameFigures.map((product) => (
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

export default GameFiguresPage;
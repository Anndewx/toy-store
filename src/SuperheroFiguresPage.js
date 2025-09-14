import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import CartModal from "./CartModal";
import ProductCard from "./ProductCard";
import "./MainPage.css"; // ใช้ CSS ไฟล์เดียวกับหน้าหลัก

function SuperheroFiguresPage() {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "null");

  const superheroFigures = [
    { id: 30, name: "Baby Groot", price: 39.78, image: "/images/superhero.jpg", onSale: false, rating: 4 },
    { id: 31, name: "Batman x Deadpool", price: 58.28, image: "/images/superhero1.jpg", onSale: false, rating: 5 },
    { id: 32, name: "Stormtrooper", price: 30.53, originalPrice: 52.11, image: "/images/superhero2.jpg", onSale: true, rating: 5 },
    { id: 33, name: "Spider-Man", price: 45.99, image: "/images/superhero.jpg", onSale: false, rating: 5 },
    { id: 34, name: "Iron Man", price: 62.50, originalPrice: 78.00, image: "/images/superhero1.jpg", onSale: true, rating: 5 },
    { id: 35, name: "Captain America", price: 48.75, image: "/images/superhero2.jpg", onSale: false, rating: 4 }
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
        <h1 className="page-title">Superhero Figures</h1>
        <p className="page-subtitle">Legendary Heroes & Iconic Characters</p>
      </header>

      <main className="product-section">
        <div className="product-grid">
          {superheroFigures.map((product) => (
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

export default SuperheroFiguresPage;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import CartModal from "./CartModal";
import ProductCard from "./ProductCard";
import "./MainPage.css"; // ใช้ CSS ไฟล์เดียวกับหน้าหลัก

function GundamFiguresPage() {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "null");

  const gundamModels = [
    { id: 50, name: "RX-78-2 Gundam", price: 68.99, image: "/images/gundam.jpg", onSale: false, rating: 5 },
    { id: 51, name: "Strike Freedom Gundam", price: 89.50, image: "/images/gundam1.jpg", onSale: false, rating: 5 },
    { id: 52, name: "Barbatos Lupus Rex", price: 72.25, originalPrice: 95.00, image: "/images/gundam2.jpg", onSale: true, rating: 5 },
    { id: 53, name: "Wing Gundam Zero", price: 76.75, image: "/images/gundam.jpg", onSale: false, rating: 4 },
    { id: 54, name: "Nu Gundam Ver. Ka", price: 125.00, originalPrice: 150.00, image: "/images/gundam1.jpg", onSale: true, rating: 5 },
    { id: 55, name: "Unicorn Gundam", price: 98.99, image: "/images/gundam2.jpg", onSale: false, rating: 5 }
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
        <h1 className="page-title">Gundam Models</h1>
        <p className="page-subtitle">Premium Mobile Suit Model Kits</p>
      </header>

      <main className="product-section">
        <div className="product-grid">
          {gundamModels.map((product) => (
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

export default GundamFiguresPage;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import CartModal from "./CartModal";
import ProductCard from "./ProductCard";
import "./MainPage.css"; // ใช้ CSS ไฟล์เดียวกับหน้าหลัก

function AnimeFiguresPage() {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "null");

  const animeFigures = [
    { id: 40, name: "Naruto Uzumaki", price: 42.99, image: "/images/anime.jpg", onSale: false, rating: 5 },
    { id: 41, name: "Goku Super Saiyan", price: 65.50, image: "/images/anime1.jpg", onSale: false, rating: 5 },
    { id: 42, name: "One Piece Luffy", price: 38.75, originalPrice: 55.00, image: "/images/anime2.jpg", onSale: true, rating: 4 },
    { id: 43, name: "Attack on Titan Eren", price: 52.25, image: "/images/anime.jpg", onSale: false, rating: 5 },
    { id: 44, name: "Demon Slayer Tanjiro", price: 46.80, originalPrice: 58.50, image: "/images/anime1.jpg", onSale: true, rating: 5 },
    { id: 45, name: "My Hero Academia Deku", price: 41.99, image: "/images/anime2.jpg", onSale: false, rating: 4 }
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
        <h1 className="page-title">Anime Figures</h1>
        <p className="page-subtitle">Epic Characters from Your Favorite Anime</p>
      </header>

      <main className="product-section">
        <div className="product-grid">
          {animeFigures.map((product) => (
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

export default AnimeFiguresPage;
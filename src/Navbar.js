// src/Navbar.js

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './MainPage.css';

const Navbar = ({ currentUser, totalCartItems, onCartClick }) => {
  const navigate = useNavigate();
  const [isShopMenuOpen, setIsShopMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/login');
  };

  const toggleShopMenu = () => {
    setIsShopMenuOpen(!isShopMenuOpen);
  };
  
  const handleShopLinkClick = () => {
    setIsShopMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-left">
          <Link className="site-logo" to="/mainpage">
            <span className="logo-text">TOYLAND</span>
          </Link>
          <ul className="nav-links">
            <li><Link to="/mainpage">หน้าแรก</Link></li>
            <li className="shop-menu-container">
              <button className="shop-menu-btn" onClick={toggleShopMenu}>
                Shop <i className={`fas ${isShopMenuOpen ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
              </button>
              {isShopMenuOpen && (
                <ul className="shop-dropdown-menu">
                  <li><Link to="/popular" onClick={handleShopLinkClick}>Popular Items</Link></li>
                  <li><Link to="/newarrivals" onClick={handleShopLinkClick}>New Arrivals</Link></li>
                  <li><Link to="/game-figures" onClick={handleShopLinkClick}>Game Figures</Link></li>
                  <li><Link to="/superhero-figures" onClick={handleShopLinkClick}>Superhero Figures</Link></li>
                  <li><Link to="/gundam-models" onClick={handleShopLinkClick}>Gundam Models</Link></li>
                  <li><Link to="/anime-figures" onClick={handleShopLinkClick}>Anime Figures</Link></li>
                </ul>
              )}
            </li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/analytics">AI Dashboard</Link></li>
          </ul>
        </div>

        <div className="navbar-right">
          <div className="search-bar">
            <i className="fas fa-search"></i>
            <input type="text" placeholder="Search..." />
          </div>
          
          <button className="cart-btn" onClick={onCartClick}>
            <i className="fas fa-shopping-cart"></i> Cart
            <span className="cart-badge">{totalCartItems}</span>
          </button>
          
          {currentUser ? (
            <div className="user-info-group">
              <span className="user-welcome">Hello, {currentUser.username}</span>
              <button className="logout-btn" onClick={handleLogout}>
                Logout <i className="fas fa-sign-out-alt"></i>
              </button>
            </div>
          ) : (
            <Link className="login-btn" to="/login">
              Sign In <i className="fas fa-sign-in-alt"></i>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
// src/Navbar.js

import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';

const Navbar = ({ currentUser, totalCartItems, onCartClick, onLogout }) => {
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [navScrolled, setNavScrolled] = useState(false);

  // Effect to handle navbar background change on scroll
  useEffect(() => {
    const handleScroll = () => {
      setNavScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogoutClick = () => {
    setIsUserDropdownOpen(false);
    onLogout();
  };

  return (
    <nav className={navScrolled ? "site-nav scrolled" : "site-nav"}>
      <div className="nav-container">
        <Link className="navbar-brand" to="/mainpage">
          <i className="fas fa-robot"></i> TOYS PARADISE
        </Link>
        <ul className="nav-links">
          {/* Use NavLink for active styling */}
          <li><NavLink className="nav-link" to="/mainpage">Home</NavLink></li>
          <li><NavLink className="nav-link" to="/popular">Popular</NavLink></li>
          <li><NavLink className="nav-link" to="/newarrivals">New Arrivals</NavLink></li>
          <li><NavLink className="nav-link" to="/analytics">AI Dashboard</NavLink></li>
        </ul>
        <div className="nav-actions">
          <button className="cart-button" onClick={onCartClick}>
            <i className="fas fa-shopping-cart"></i>
            <span>Cart</span>
            <span className="cart-badge">{totalCartItems}</span>
          </button>
          {currentUser ? (
            <div className="user-menu-container">
              <button 
                className="user-avatar-button" 
                onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
              >
                {currentUser.username.charAt(0)}
              </button>
              
              {isUserDropdownOpen && (
                <div className="user-dropdown">
                  <div className="dropdown-header">
                    Signed in as <br/>
                    <strong>{currentUser.username}</strong>
                  </div>
                  <button className="dropdown-item" onClick={handleLogoutClick}>
                    <i className="fas fa-sign-out-alt"></i> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="login-button">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

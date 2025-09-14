// src/AboutPage.js

import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import './AboutPage.css'; 

function AboutPage() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
    return (
        <div className="about-page-wrapper">
            <Navbar 
                currentUser={currentUser} 
                totalCartItems={0} 
                onCartClick={() => alert('Cart functionality is not available on this page.')} 
            />
            
            <header className="about-hero-section">
                <div className="hero-content">
                    <h1 className="hero-title">About Our Store</h1>
                    <p className="hero-subtitle">Our Passion for Toys and Collectibles</p>
                </div>
            </header>
            
            <main className="about-content-section">
                <div className="story-card">
                    <div className="story-text">
                        <h2 className="story-title">Our Story</h2>
                        <p>Welcome to Toy Store, your ultimate destination for high-quality collectibles. We are passionate about toys and figures from the most beloved universes in anime, gaming, and pop culture. Our mission is to provide fellow enthusiasts with a curated selection of rare, popular, and new-release items.</p>
                        <p>Founded by collectors, for collectors, we understand the thrill of finding that perfect piece to complete your collection. We are committed to authenticity, excellent customer service, and fast shipping to ensure your figures arrive in pristine condition.</p>
                        <p>Thank you for being a part of our community. Happy collecting!</p>
                    </div>
                </div>

                <Link to="/mainpage" className="btn-primary-link">
                    <i className="fas fa-arrow-left"></i> Back to Main Page
                </Link>
            </main>
            
            <Footer />
        </div>
    );
}

export default AboutPage;
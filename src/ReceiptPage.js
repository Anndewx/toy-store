// src/ReceiptPage.js

import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import './ReceiptPage.css';

function ReceiptPage() {
    const location = useLocation();
    const { cartItems, totalPrice, orderId } = location.state || { cartItems: [], totalPrice: '0.00', orderId: 'N/A' };

    return (
        <div className="receipt-container">
            <div className="receipt-card">
                <div className="receipt-header">
                    <i className="fas fa-check-circle success-icon"></i>
                    <h2>Order Confirmed!</h2>
                    <p>Thank you for your purchase. Your order has been successfully placed.</p>
                </div>
                <div className="receipt-details">
                    <h3>Order #{orderId}</h3>
                    <ul className="receipt-items">
                        {cartItems.map(item => (
                            <li key={item.id} className="receipt-item">
                                <span className="item-name">{item.name} x {item.quantity}</span>
                                <span className="item-price">${(item.price * item.quantity).toFixed(2)}</span>
                            </li>
                        ))}
                    </ul>
                    <div className="receipt-summary">
                        <p>Subtotal: ${totalPrice}</p>
                        <p>Shipping: $0.00</p>
                        <div className="final-total">
                            <h3>Total: ${totalPrice}</h3>
                        </div>
                    </div>
                </div>
                <div className="back-to-home-link">
                    <Link to="/mainpage">
                        <i className="fas fa-arrow-left"></i> Back to Main Page
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default ReceiptPage;
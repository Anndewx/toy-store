// src/CheckoutPage.js

import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import './CheckoutPage.css';

function CheckoutPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const { cartItems } = location.state || { cartItems: [] };
    const [isProcessing, setIsProcessing] = useState(false);

    const getTotalPrice = () => {
        return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);
    };

    const handlePayment = (e) => {
        e.preventDefault();
        setIsProcessing(true);
        setTimeout(() => {
            setIsProcessing(false);
            navigate('/receipt', { 
                state: { 
                    cartItems, 
                    totalPrice: getTotalPrice(),
                    orderId: Math.random().toString(36).substr(2, 9).toUpperCase()
                } 
            });
        }, 2000); 
    };

    if (cartItems.length === 0) {
        return (
            <div className="checkout-container">
                <div className="empty-cart-message">
                    <h3>Your cart is empty!</h3>
                    <p>Please go back to the <Link to="/mainpage">home page</Link> to add some items.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="checkout-container">
            <div className="checkout-card">
                <h2><i className="fas fa-credit-card"></i> Checkout</h2>
                <div className="checkout-details">
                    <h3>Order Summary</h3>
                    <ul>
                        {cartItems.map(item => (
                            <li key={item.id}>
                                <span>{item.name} x {item.quantity}</span>
                                <span>${(item.price * item.quantity).toFixed(2)}</span>
                            </li>
                        ))}
                    </ul>
                    <div className="total-summary">
                        <span>Total:</span>
                        <span>${getTotalPrice()}</span>
                    </div>
                </div>

                <form className="payment-form" onSubmit={handlePayment}>
                    <h3>Payment Details</h3>
                    <div className="form-group">
                        <label htmlFor="card-number">Card Number</label>
                        <input type="text" id="card-number" placeholder="XXXX-XXXX-XXXX-XXXX" required disabled={isProcessing} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="card-holder">Card Holder Name</label>
                        <input type="text" id="card-holder" placeholder="John Doe" required disabled={isProcessing} />
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="expiry">Expiry</label>
                            <input type="text" id="expiry" placeholder="MM/YY" required disabled={isProcessing} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="cvc">CVC</label>
                            <input type="text" id="cvc" placeholder="XXX" required disabled={isProcessing} />
                        </div>
                    </div>
                    <button type="submit" className="pay-button" disabled={isProcessing}>
                        {isProcessing ? (
                            <>
                                <i className="fas fa-spinner fa-spin"></i> Processing...
                            </>
                        ) : (
                            <>
                                <i className="fas fa-lock"></i> Pay Now
                            </>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default CheckoutPage;
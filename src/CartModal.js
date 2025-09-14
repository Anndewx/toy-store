// src/CartModal.js

import React from 'react';
import './MainPage.css';

const CartModal = ({ isOpen, onClose, cartItems, removeFromCart, getTotalPrice, navigateToCheckout }) => {
  if (!isOpen) return null;
  return (
    <div className="cart-modal-overlay" onClick={onClose}>
      <div className="cart-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="cart-modal-header">
          <h2><i className="fas fa-shopping-cart"></i> Your Cart</h2>
          <button className="close-button" onClick={onClose}>&times;</button>
        </div>
        <div className="cart-modal-body">
          {cartItems.length === 0 ? (
            <div className="empty-cart">
              <i className="fas fa-box-open"></i>
              <h3>Your cart is empty</h3>
              <p>Looks like you haven't added anything yet.</p>
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-item-image" />
                <div className="cart-item-details">
                  <h4>{item.name}</h4>
                  <p>Qty: {item.quantity}</p>
                </div>
                <div className="cart-item-price">${(item.price * item.quantity).toFixed(2)}</div>
                <button className="remove-button" onClick={() => removeFromCart(item.id)}>
                  <i className="fas fa-trash-alt"></i>
                </button>
              </div>
            ))
          )}
        </div>
        {cartItems.length > 0 && (
          <div className="cart-modal-footer">
            <div className="total-price">
              <h3>Total:</h3>
              <h2>${getTotalPrice()}</h2>
            </div>
            <button className="checkout-button" onClick={navigateToCheckout}>Proceed to Checkout</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartModal;
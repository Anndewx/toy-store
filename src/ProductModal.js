// src/ProductModal.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProductModal.css';

const API_URL = 'http://localhost:5002/api';

const ProductModal = ({ productId, onClose }) => {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [rating, setRating] = useState(0);
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (!productId) {
            setProduct(null);
            setLoading(false);
            return;
        }

        const fetchProduct = async () => {
            try {
                const response = await axios.get(`${API_URL}/products/${productId}`);
                setProduct(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching product details:', error);
                setMessage('เกิดข้อผิดพลาดในการโหลดข้อมูลสินค้า');
                setLoading(false);
            }
        };
        fetchProduct();
    }, [productId]);

    const handleRate = async (newRating) => {
        try {
            await axios.post(`${API_URL}/products/${productId}/rate`, { rating: newRating });
            setRating(newRating);
            setMessage('ให้คะแนนเรียบร้อยแล้ว!');
        } catch (error) {
            console.error('Error submitting rating:', error);
            setMessage('เกิดข้อผิดพลาดในการให้คะแนน');
        }
    };

    if (!productId) {
        return null;
    }
    
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="close-button" onClick={onClose}>&times;</button>
                {loading ? (
                    <div className="modal-loading">กำลังโหลด...</div>
                ) : !product ? (
                    <div className="modal-not-found">ไม่พบสินค้า</div>
                ) : (
                    <div className="product-detail-modal">
                        <h1>{product.name}</h1>
                        <img src={product.image} alt={product.name} className="product-image" />
                        <p>{product.description}</p>
                        <h3>ราคา: {product.price} บาท</h3>
                        
                        <div className="product-rating-section">
                            <h4>ให้คะแนนสินค้านี้:</h4>
                            <div className="star-rating">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <span 
                                        key={star} 
                                        onClick={() => handleRate(star)}
                                        className={`star ${star <= rating ? 'filled' : ''}`}
                                    >
                                        ★
                                    </span>
                                ))}
                            </div>
                            {message && <div className="rating-message">{message}</div>}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductModal;
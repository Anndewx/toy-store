import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ProductDetail.css';

const API_URL = 'http://localhost:5002/api';

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`${API_URL}/products/${id}`);
                setProduct(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching product details:', error);
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const handleAddToCart = () => {
        // ยังไม่มีฟังก์ชันเพิ่มสินค้าลงในตะกร้าจริง
        alert(`เพิ่มสินค้า "${product.name}" ลงในตะกร้าแล้ว!`);
    };

    if (loading) {
        return <div className="loading-text">กำลังโหลดสินค้า...</div>;
    }

    if (!product) {
        return <div className="not-found-text">ไม่พบสินค้า</div>;
    }

    return (
        <div className="product-detail-container">
            <button onClick={() => navigate(-1)} className="back-button">
                &larr; ย้อนกลับ
            </button>
            <div className="product-content">
                <div className="product-image-area">
                    <img src={product.image_url} alt={product.name} className="main-product-image" />
                </div>
                <div className="product-details-area">
                    <h1 className="product-name">{product.name}</h1>
                    <p className="product-price">ราคา: {product.price} บาท</p>
                    <p className="product-description">{product.description}</p>
                    <button onClick={handleAddToCart} className="add-to-cart-btn">
                        เพิ่มลงในตะกร้า
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
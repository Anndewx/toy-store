import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard'; 
import ProductModal from './ProductModal'; 

const API_URL = 'http://localhost:5002/api';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedProductId, setSelectedProductId] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`${API_URL}/products`);
                setProducts(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching products:', error);
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    if (loading) {
        return <div>กำลังโหลดสินค้า...</div>;
    }

    return (
        <div>
            <div className="product-grid">
                {products.map((product) => (
                    <div key={product.id} onClick={() => setSelectedProductId(product.id)}>
                        <ProductCard product={product} />
                    </div>
                ))}
            </div>
            
            <ProductModal
                productId={selectedProductId}
                onClose={() => setSelectedProductId(null)}
            />
        </div>
    );
};

export default Products;
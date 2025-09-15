const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise');

module.exports = (dbConfig) => {
    const pool = mysql.createPool(dbConfig);

    // API สำหรับดึงข้อมูลสินค้าทั้งหมด
    router.get('/', async (req, res) => {
        try {
            const [rows] = await pool.query('SELECT * FROM products');
            res.json(rows);
        } catch (error) {
            console.error('Error fetching products:', error);
            res.status(500).json({ message: 'Server error' });
        }
    });

    // API สำหรับดึงข้อมูลสินค้าชิ้นเดียว
    router.get('/:id', async (req, res) => {
        try {
            // โค้ดที่แก้ไขให้ถูกต้อง: ดึงข้อมูลทั้งหมดจากตาราง products
            const [rows] = await pool.query('SELECT * FROM products WHERE id = ?', [req.params.id]);
            if (rows.length === 0) {
                return res.status(404).json({ message: 'Product not found.' });
            }
            res.json(rows[0]);
        } catch (error) {
            console.error('Error fetching product details:', error);
            res.status(500).json({ message: 'Server error' });
        }
    });
    
    return router;
};
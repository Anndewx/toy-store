const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt'); // ต้องมีการติดตั้ง bcrypt และนำเข้า
const bodyParser = require('body-parser');

const productsRoutes = require('./routes/products');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 5002;

// กำหนดค่าการเชื่อมต่อฐานข้อมูล
const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '', // กรุณาตรวจสอบรหัสผ่าน MySQL ของคุณ
    database: 'toy_store',
    port: 3301, // พอร์ต MySQL ที่คุณใช้
};

// Middleware
app.use(cors());
app.use(express.json()); // ใช้ express.json() แทน body-parser.json()
app.use(express.static('public')); // สำหรับรูปภาพในโฟลเดอร์ public

app.use(express.static(path.join(__dirname, 'public')));

// กำหนด Router
app.use('/api', authRoutes(dbConfig, bcrypt));
app.use('/api/products', productsRoutes(dbConfig));

// เริ่มเซิร์ฟเวอร์
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
// server.js
// นี่คือโค้ดสำหรับสร้างเซิร์ฟเวอร์หลังบ้านเพื่อเชื่อมต่อกับฐานข้อมูล MySQL

const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');

const mysql = require('mysql2/promise'); // ใช้ promise-based version เพื่อความง่ายในการใช้ async/await

const app = express();
// สามารถเปลี่ยนพอร์ตได้ที่นี่ หากพอร์ต 4000 ถูกใช้งานอยู่
const port = process.env.PORT || 4000; // เปลี่ยนพอร์ตเริ่มต้นเป็น 4000

// Middleware
app.use(express.json());
app.use(cors());

// สร้าง connection pool สำหรับเชื่อมต่อฐานข้อมูล
// วิธีนี้ดีกว่าการสร้าง connection ทีละครั้ง
let pool;

async function initializeDatabase() {
    try {
        pool = mysql.createPool({
            host: 'localhost',
            user: 'root',
            password: '', 
            port: 3306,
            database: 'toy_store',
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0
        });
        console.log('✅ Database pool connected!');
    } catch (error) {
        console.error('❌ Failed to create database pool:', error);
        // สามารถเพิ่มโค้ดเพื่อปิดเซิร์ฟเวอร์ได้หากฐานข้อมูลเชื่อมต่อไม่ได้
        process.exit(1); 
    }
}

// รอให้ฐานข้อมูลเชื่อมต่อสำเร็จก่อนที่จะเริ่มเซิร์ฟเวอร์
app.on('ready', async () => {
    await initializeDatabase();
    app.listen(port, () => {
        console.log(`🚀 Server running on http://localhost:${port}`);
    });
});

// สำหรับกรณีที่ Node.js app ไม่ได้ใช้ ready event
(async () => {
    await initializeDatabase();
    if (!app._isListening) {
        app.listen(port, () => {
            console.log(`🚀 Server running on http://localhost:${port}`);
        });
    }
})();

// --- Register Route ---
app.post('/api/register', async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: 'Please provide both username and password.' });
        }

        // ตรวจสอบว่า username ซ้ำหรือไม่
        const [existingUsers] = await pool.query('SELECT username FROM users WHERE username = ?', [username]);
        if (existingUsers.length > 0) {
            return res.status(409).json({ message: 'Username already exists.' });
        }

        // เข้ารหัสรหัสผ่าน
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // บันทึกผู้ใช้ใหม่ลงในฐานข้อมูล
        const sql = `INSERT INTO users (username, password) VALUES (?, ?)`;
        await pool.query(sql, [username, hashedPassword]);

        res.status(201).json({ message: 'Registration successful!' });

    } catch (error) {
        console.error('Registration error:', error);
        // แสดงข้อความ error ที่ชัดเจนขึ้น
        res.status(500).json({ message: 'An error occurred during registration. Please check the server logs.' });
    }
});

// --- Login Route ---
app.post('/api/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: 'Please provide both username and password.' });
        }

        // ค้นหาผู้ใช้จาก username
        const [users] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
        const user = users[0];

        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password.' });
        }

        // เปรียบเทียบรหัสผ่าน
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid username or password.' });
        }

        res.status(200).json({ 
            message: 'Login successful!', 
            user: { username: user.username },
            token: 'dummy-token-for-now' 
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'An error occurred during login. Please check the server logs.' });
    }
});

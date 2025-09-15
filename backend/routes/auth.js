const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise');

module.exports = (dbConfig, bcrypt) => {
    const pool = mysql.createPool(dbConfig);

    // API สำหรับการลงทะเบียน
    router.post('/register', async (req, res) => {
        try {
            const { username, password } = req.body;
            
            // แฮชรหัสผ่านก่อนบันทึกลงในฐานข้อมูล
            const hashedPassword = await bcrypt.hash(password, 10);
            
            // บันทึกผู้ใช้ลงในฐานข้อมูล
            await pool.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword]);

            res.status(200).json({ message: 'ลงทะเบียนสำเร็จ' });
        } catch (error) {
            console.error('Registration error:', error);
            if (error.code === 'ER_DUP_ENTRY') {
                return res.status(409).json({ message: 'ชื่อผู้ใช้นี้มีอยู่แล้ว' });
            }
            res.status(500).json({ message: 'เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์' });
        }
    });

    // API สำหรับการเข้าสู่ระบบ
    router.post('/login', async (req, res) => {
        try {
            const { username, password } = req.body;
            
            // ดึงข้อมูลผู้ใช้จากฐานข้อมูล
            const [rows] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
            if (rows.length === 0) {
                return res.status(401).json({ message: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง' });
            }
            const user = rows[0];

            // เปรียบเทียบรหัสผ่านที่แฮชไว้
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({ message: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง' });
            }
            
            res.status(200).json({ message: 'เข้าสู่ระบบสำเร็จ', user: { username: user.username } });
        } catch (error) {
            console.error('Login error:', error);
            res.status(500).json({ message: 'เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์' });
        }
    });

    return router;
};
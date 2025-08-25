const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const db = require('../db');

// สมัครสมาชิก
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  db.query(
    'INSERT INTO users (username, password) VALUES (?, ?)',
    [username, hashedPassword],
    (err, result) => {
      if (err) return res.status(500).json({ error: 'Register failed' });
      res.status(201).json({ message: 'User created' });
    }
  );
});

// ล็อกอิน
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  db.query(
    'SELECT * FROM users WHERE username = ?',
    [username],
    async (err, results) => {
      if (err || results.length === 0)
        return res.status(400).json({ error: 'User not found' });

      const validPassword = await bcrypt.compare(password, results[0].password);
      if (!validPassword)
        return res.status(400).json({ error: 'Invalid password' });

      res.json({ message: 'Login successful' });
    }
  );
});

module.exports = router;

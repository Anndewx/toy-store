const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',        // XAMPP ใหม่ user 'root' ไม่มีรหัสผ่าน
  port: 3306,          // ระบุพอร์ต 3306 ให้ชัดเจน
  database: 'toy_store'
});

connection.connect((err) => {
  if (err) {
    console.error('❌ MySQL connection error:', err);
    throw err;
  }
  console.log('✅ MySQL connected!');
});

module.exports = connection;
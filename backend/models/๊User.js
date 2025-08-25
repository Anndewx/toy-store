const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },  // ชื่อผู้ใช้ไม่ซ้ำกัน
  password: { type: String, required: true },                // รหัสผ่าน (ควรเข้ารหัสก่อนเก็บ)
});

module.exports = mongoose.model('User', userSchema);

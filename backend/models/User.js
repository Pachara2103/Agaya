const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  uid: {
    type: String,
    required: true,
    unique: true,
    maxlength: 100
  },
  username: {
    type: String,
    required: true,
    maxlength: 72
  },
  password: {
    type: String,
    required: true,
    maxlength: 72
  },
  phone_number: {
    type: String,
    required: true,
    match: /^[0-9]{10}$/ // ตรวจสอบว่าเป็นเลข 10 หลัก
  },
  email: {
    type: String,
    required: true,
    maxlength: 72,
    match: /^\S+@\S+\.\S+$/ // ตรวจสอบรูปแบบ email
  },
  usertype: {
    type: String,
    required: true,
    maxlength: 10
  },
  address: {
    type: String,
    required: true,
    maxlength: 255
  },
  birth_date: {
    type: Date,
    required: true
  }
}, {
  timestamps: true // เพิ่ม createdAt และ updatedAt อัตโนมัติ
});

module.exports = mongoose.model('User', userSchema);

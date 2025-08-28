const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  uid: {
    type: String,
    required: true,  // ไม่สามารถเป็น null (เหมือน NOT NULL)
    unique: true,
    maxlength: 100
  }
}, {
  timestamps: true // สร้าง createdAt และ updatedAt อัตโนมัติ
});

module.exports = mongoose.model('Admin', adminSchema);

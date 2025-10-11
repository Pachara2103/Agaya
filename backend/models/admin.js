const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,  // ไม่สามารถเป็น null (เหมือน NOT NULL)
    unique: true,
    maxlength: 100,
    ref : 'User'
  }
}, {
  timestamps: true // สร้าง createdAt และ updatedAt อัตโนมัติ
});

module.exports = mongoose.model('Admin', adminSchema);

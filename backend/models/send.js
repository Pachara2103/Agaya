const mongoose = require('mongoose');

const sendSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    maxlength: 100,
    ref: 'User' // อ้างอิงผู้ส่ง
  },
  messageId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    maxlength: 100,
    ref: 'Message' // อ้างอิงข้อความ
  }
}, {
  timestamps: true
});

const Send = mongoose.model('Send', sendSchema);
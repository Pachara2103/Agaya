const mongoose = require('mongoose');

const receiveSchema = new mongoose.Schema({
  uid: {
    type: String,
    required: true,
    maxlength: 100,
    ref: 'User' // อ้างอิงผู้รับ
  },
  mid: {
    type: String,
    required: true,
    maxlength: 100,
    ref: 'Message' // อ้างอิงข้อความ
  }
}, {
  timestamps: true
});

const Receive = mongoose.model('Receive', receiveSchema);

const mongoose = require('mongoose');

const vendorApplicationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user', //ส่วนนี้ไม่เป็น vendor หรอ
    required: true,
    unique: true 
  },
  storeName: {
    type: String,
    required: [true, 'Please provide store name'],
    trim: true,
    maxlength: 100
  },
  sampleProducts: {
    type: String,
    required: [true, 'Please provide your item that you want to sell'],
    maxlength: 500
  },
  // modify later
  address: {
    type: String,
    maxlength: 300
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
}, {
  timestamps: true 
});

module.exports = mongoose.models.VendorApplication || mongoose.model('VendorApplication', vendorApplicationSchema);
const mongoose = require('mongoose');

const vendorSchema = new mongoose.Schema({
  uid: {
    type: String,
    required: true,
    unique: true,
    maxlength: 100
  },
  rating: {
    type: Number,
    min: 0.0,
    max: 5.0,
    default: null // เนื่องจาก Allow Nulls = Yes
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Vendor', vendorSchema);

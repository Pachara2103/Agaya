const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  rid: {
    type: String,
    required: true,
    unique: true,
    maxlength: 100
  },
  transaction_id: {
    type: String,
    required: true,
    maxlength: 100,
    ref: 'Transaction' // อ้างอิง Transaction
  },
  pid: {
    type: String,
    required: true,
    maxlength: 100,
    ref: 'Product' // อ้างอิง Product
  },
  cid: {
    type: String,
    required: true,
    maxlength: 100,
    ref: 'Customer' // อ้างอิง Customer
  },
  vid: {
    type: String,
    required: true,
    maxlength: 100,
    ref: 'Vendor' // อ้างอิง Vendor
  },
  vendor_response: {
    type: String,
    default: null // Allow Nulls = Yes
  },
  review_date: {
    type: Date,
    required: true,
    default: Date.now
  },
  rating: {
    type: Number,
    required: true,
    min: 0,
    max: 5
  },
  review_content: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Review', reviewSchema);

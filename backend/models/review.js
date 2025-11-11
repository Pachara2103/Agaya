const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  transactionId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    maxlength: 100,
    ref: 'Transaction'
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    maxlength: 100,
    ref: 'Product'
  },
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true, 
    maxlength: 100,
    ref: 'Customer' 
  },
  vendorId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    maxlength: 100,
    ref: 'Vendor'
  },
  vendorResponse: {
    type: String,
    default: null 
  },
  reviewDate: {
    type: Date,
    default: Date.now
  },
  rating: {
    type: Number,
    required: true,
    min: 0,
    max: 5
  },
  image: {
    type: [String],
    default: []
  },
  reviewContent: {
    type: String,
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Review', reviewSchema);

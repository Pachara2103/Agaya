const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  // reviewId: {
  //   type: String,
  //   required: true,
  //   unique: true,
  //   maxlength: 100
  // },
  // Mongoose auto generate this
  transactionId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    maxlength: 100,
    ref: 'Transaction' // อ้างอิง Transaction
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    maxlength: 100,
    ref: 'Product' // อ้างอิง Product
  },
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    maxlength: 100,
    ref: 'Customer' // อ้างอิง Customer
  },
  vendorId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    maxlength: 100,
    ref: 'Vendor' // อ้างอิง Vendor
  },
  vendorResponse: {
    type: String,
    default: null // Allow Nulls = Yes
  },
  reviewDate: {
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
  reviewContent: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Review', reviewSchema);

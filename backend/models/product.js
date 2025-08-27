const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  product_id: {
    type: String,
    required: true,
    unique: true,
    maxlength: 100
  },
  product_name: {
    type: String,
    required: true,
    maxlength: 255
  },
  stock_quantity: {
    type: Number,
    required: true,
    min: 0,
    max: 99999
  },
  price: {
    type: Number,
    required: true,
    min: 0,
    max: 99999999
  },
  rating: {
    type: Number,
    min: 0.0,
    max: 5.0,
    default: null // เพราะ Allow Nulls = Yes
  },
  vid: {
    type: String,
    required: true,
    maxlength: 100,
    ref: 'Vendor' // อ้างอิง Vendor schema
  },
  type: {
    type: String,
    maxlength: 100,
    default: null // เพราะ Allow Nulls = Yes
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Product', productSchema);

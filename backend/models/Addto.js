const mongoose = require('mongoose');

const addToSchema = new mongoose.Schema({
  pid: {
    type: String,
    required: true,
    maxlength: 100,
    ref: 'Product' // อ้างอิง Product
  },
  cart_id: {
    type: String,
    required: true,
    maxlength: 100,
    ref: 'Cart' // อ้างอิง Cart
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
    max: 99999
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Addto', addToSchema);

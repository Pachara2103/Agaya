const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  uid: {
    type: String,
    required: true,
    maxlength: 100,
    ref: 'Customer' // อ้างอิง Customer
  },
  cart_id: {
    type: String,
    required: true,
    unique: true,
    maxlength: 100
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Cart', cartSchema);

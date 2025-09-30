const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  uid: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    maxlength: 100,
    ref: 'Customer' // อ้างอิง Customer
  },
  cart_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique: true,
    maxlength: 100
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Cart', cartSchema);

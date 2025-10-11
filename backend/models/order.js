const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  /*oid: {
    type: String,
    required: true,
    unique: true,
    maxlength: 100
  },*/
  order_date: {
    type: Date,
    required: true,
    default: Date.now
  },
  order_status: {
    type: String,
    required: true,
    enum: ['NOT_PAID', 'PAID', 'COMPLETED'], // จำกัดค่าตาม Valid Values
    maxlength: 32
  },
  cart_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    maxlength: 100,
    ref: 'Cart' // อ้างอิง Cart
  },
  cid: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    maxlength: 100,
    ref: 'Customer' // อ้างอิง Customer
  },
  vid: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    maxlength: 100,
    ref: 'Vendor' // อ้างอิง Vendor
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Order', orderSchema);

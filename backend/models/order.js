const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  /*oid: {
    type: String,
    required: true,
    unique: true,
    maxlength: 100
  },*/
  orderDate: {
    type: Date,
    required: true,
    default: Date.now
  },
  orderStatus: {
    type: String,
    required: true,
    enum: ['NOT_PAID', 'PAID', 'COMPLETED'], // จำกัดค่าตาม Valid Values
    maxlength: 32
  },
  cartId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    maxlength: 100,
    ref: 'Cart' // อ้างอิง Cart
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
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Order', orderSchema);

const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    maxlength: 100,
    ref: 'Customer' // อ้างอิง Customer
  }
  // cartId: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   required: true,
  //   unique: true,
  //   maxlength: 100
  // }
  // mongoose auto generate this
}, {
  timestamps: true
});

module.exports = mongoose.model('Cart', cartSchema);

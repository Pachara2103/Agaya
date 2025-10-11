const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  uid: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    maxlength: 100,
    ref: 'Customer' // อ้างอิง Customer
  },
}, {
  timestamps: true
});

module.exports = mongoose.model('Cart', cartSchema);

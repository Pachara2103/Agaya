const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  transaction_id: {
    type: String,
    required: true,
    unique: true,
    maxlength: 100
  },
  payment_method: {
    type: String,
    required: true,
    maxlength: 32
  },
  transaction_date: {
    type: Date,
    required: true,
    default: Date.now
  },
  oid: {
    type: String,
    required: true,
    maxlength: 100,
    ref: 'Order' // อ้างอิง Order
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Transaction', transactionSchema);

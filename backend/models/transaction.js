const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  /*transaction_id: {
    type: String,
    required: true,
    unique: true,
    maxlength: 100
  },*/
  paymentMethod: {
    type: String,
    required: true,
    maxlength: 32
  },
  transactionDate: {
    type: Date,
    required: true,
    default: Date.now
  },
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    maxlength: 100,
    ref: 'Order' // อ้างอิง Order
  },
  amount: {
    type: Number,
    min : 0,
    max : 9999999
  },
  status: {
    type: String,
    enum: ['PENDING', 'COMPLETED', 'REFUNDED'],
    default: 'PENDING'
  },
  refunded: {
    type: Boolean,
    default: false
  },
  refundDate: {
    type: Date
  },
  refundAmount: {
    type: Number
  },
  refundNote: {
    type: String
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Transaction', transactionSchema);

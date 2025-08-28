const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  uid: {
    type: String,
    required: true,
    unique: true,
    maxlength: 100
  },
  balance: {
    type: Number,
    required: true,
    min: 0.00,
    max: 99999999.99,
    default: 0.00
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Customer', customerSchema);

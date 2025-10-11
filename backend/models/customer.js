const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique: true,
    maxlength: 100,
    ref : 'User'
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

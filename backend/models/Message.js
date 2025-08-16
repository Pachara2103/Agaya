const mongoose = require('mongoose');

// Messages Schema
const messageSchema = new mongoose.Schema({
  mid: {
    type: String,
    required: true,
    unique: true,
    maxlength: 100
  },
  type: {
    type: String,
    required: true,
    maxlength: 20
  },
  status: {
    type: String,
    required: true,
    maxlength: 20
  },
  message: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    required: true,
    default: Date.now
  }
}, {
  timestamps: true
});

const Message = mongoose.model('Message', messageSchema);
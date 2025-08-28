const mongoose = require('mongoose');

const supportTicketSchema = new mongoose.Schema({
  tid: {
    type: String,
    required: true,
    unique: true,
    maxlength: 100
  },
  cid: {
    type: String,
    required: true,
    maxlength: 100,
    ref: 'Customer' // อ้างอิง Customer
  },
  aid: {
    type: String,
    required: true,
    maxlength: 100,
    ref: 'Admin' // อ้างอิง Admin
  },
  ticket_description: {
    type: String,
    required: true
  },
  date_created: {
    type: Date,
    required: true,
    default: Date.now
  },
  status: {
    type: String,
    required: true,
    maxlength: 20
  },
  priority: {
    type: Number,
    required: true,
    min: 0,
    max: 3
  },
  subject: {
    type: String,
    required: true,
    maxlength: 100
  },
  admin_response: {
    type: String,
    default: null // เพราะ Allow Nulls = Yes
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Support_Ticket', supportTicketSchema);

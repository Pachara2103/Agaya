const mongoose = require('mongoose');

const supportTicketSchema = new mongoose.Schema({
  // ticketId: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   required: true,
  //   unique: true,
  //   maxlength: 100
  // },
  // mongoose genarate this
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    maxlength: 100,
    ref: 'Customer' // อ้างอิง Customer
  },
  adminId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    maxlength: 100,
    ref: 'Admin' // อ้างอิง Admin
  },
  ticketDescription: {
    type: String,
    required: true
  },
  dateCreated: {
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
  adminResponse: {
    type: String,
    default: null // เพราะ Allow Nulls = Yes
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Support_Ticket', supportTicketSchema);

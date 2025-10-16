const mongoose = require('mongoose');

const adminResponseSubschema = new mongoose.Schema({
  responseStatus: {
    type: String,
    enum: ['OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED'],
    required: true
  },
  message: {
    type: String,
    default: function() {
      const defaultMessages = {
        OPEN: "Your issue has been submitted and is awaiting review.",
        IN_PROGRESS: "Your issue is being reviewed.",
        RESOLVED: "Your issue has been resolved.",
        CLOSED: "This ticket has been closed."
      };
      return defaultMessages[this.responseStatus];
    }
  },
  adminResponseDate: {
    type: Date,
    default: Date.now
  },
  adminId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin'
  }
}, { _id: false });

const supportTicketSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  ticketDescription: {
    type: String,
    required: true
  },
  dateCreated: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED'],
    default: 'OPEN'
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
    type: [adminResponseSubschema],
    require: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Support_Ticket', supportTicketSchema);

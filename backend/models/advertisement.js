const mongoose = require('mongoose');

const advertisementSchema = new mongoose.Schema({
  // advertisementId: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   required: true,
  //   unique: true,
  //   maxlength: 100
  // },
  // mongoose generate this
  vendorId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    maxlength: 100,
    ref: 'Vendor' // อ้างอิง Vendor
  },
  adminId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    maxlength: 100,
    ref: 'Admin' // อ้างอิง Admin
  },
  start_date: {
    type: Date,
    required: true
  },
  end_date: {
    type: Date,
    required: true
  },
  target_audience: {
    type: String,
    required: true,
    maxlength: 100
  },
  title: {
    type: String,
    required: true,
    maxlength: 100
  },
  description: {
    type: String,
    required: true
  },
  budget: {
    type: Number,
    required: true,
    min: 0.00,
    max: 999999.99
  },
  status: {
    type: String,
    required: true,
    maxlength: 20
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Advertisement', advertisementSchema);

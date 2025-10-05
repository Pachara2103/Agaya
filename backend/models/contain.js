const mongoose = require('mongoose');

const containSchema = new mongoose.Schema({
  pid: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    maxlength: 100,
    ref: 'Product' // อ้างอิง Product
  },
  oid: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    maxlength: 100,
    ref: 'Order' // อ้างอิง Order
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
    max: 99999
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Contain', containSchema);


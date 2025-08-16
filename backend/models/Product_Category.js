const mongoose = require('mongoose');

const productCategorySchema = new mongoose.Schema({
  pid: {
    type: String,
    required: true,
    maxlength: 100,
    ref: 'Product' // อ้างอิง Product
  },
  ptype: {
    type: String,
    required: true,
    maxlength: 100
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Product_Category', productCategorySchema);

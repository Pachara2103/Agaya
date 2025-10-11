const mongoose = require('mongoose');

const productCategorySchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    maxlength: 100,
    ref: 'Product' // อ้างอิง Product
  },
  productType: {
    type: String,
    required: true,
    maxlength: 100
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Product_Category', productCategorySchema);

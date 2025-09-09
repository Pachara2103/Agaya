const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  product_id: {
    type: String,
    required: [true,"Plaese enter Product's id"],
    unique: true,
    trim: true,
    maxlength: [100, "Product,s id can not be more than 100 characters"]
  },
  product_name: {
    type: String,
    required: [true,"Plaese enter Product's name"], 
    trim : true ,
    maxlength: [255, "Product's name can not be more than 255 characters"]
  },
  stock_quantity: {
    type: Number,
    required: [true,"Require stock quantity"],
    min: 0,
    max: 99999
  }, 
  price : {
    type: Number,
    required: [true,"Please enter Product's price"],
    min: 0,
    max: 99999999
  },
  rating: {
    type: Number,
    min: 0.0,
    max: 5.0,
    default: null
  },
  vid: {
    type: String,
    required: [true,"Plaes e enter Vendor's id"],
    maxlength: [100,"Vidor's id can not be more than 100 characters"],
    ref: 'Vendor' 
  },
  type: {
    type: String,
    maxlength: [100,"Type can not be more than 100 characters"],
    default: null 
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Product', productSchema);

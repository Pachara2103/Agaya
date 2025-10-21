const mongoose = require('mongoose');
const {trackingEventSubschema} = require("./orderTracking.subschema")

// เอาไว้นี่ก่อน เดะย้ายใหม่
const shippingAddressSubschema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true, 
        maxlength: 72 
    }, 
    phoneNumber: { 
        type: String, 
        required: true, 
        match: /^[0-9]{10}$/ 
    }, 
    address: { 
        type: String, 
        required: true, 
        maxlength: 255 
    } 
}, { _id: false });

const orderSchema = new mongoose.Schema({
  orderDate: {
    type: Date,
    required: true,
    default: Date.now
  },
  orderTracking: {
    type: [trackingEventSubschema],
    required: true
  },
  shippingAddress: {
    type: shippingAddressSubschema,
    // required: true, future improvement // it will crashed mongodb now if uncomment
  },
  cartId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    maxlength: 100,
    ref: 'Cart' // อ้างอิง Cart
  },
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    maxlength: 100,
    ref: 'Customer' // อ้างอิง Customer
  },
  vendorId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    maxlength: 100,
    ref: 'Vendor' // อ้างอิง Vendor
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Order', orderSchema);

// orderTracking: [
//     {
//         statusKey: 'ORDER_RECEIVED',
//         description: 'คำสั่งซื้อได้รับการยืนยันและรอเตรียมการจัดส่ง',
//         timestamp: new Date()
//     }
// ]

// must initial with this one required is true
// have to handle when place order must paid exactly
// after confirmed receive will have to add balance to vendor 
// have to make balance in vendor model
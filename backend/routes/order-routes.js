const express = require('express');
const router = express.Router();
const { checkoutOrder, getOrder, getOrdersByCustomer, getOrdersByVendor, addOrderTrackingEvent, cancelOrder} = require('../controllers/order-controller');
const {protect, authorize} = require('../middleware/auth');

router.post('/checkout', protect, authorize("customer") , checkoutOrder);

router.put('/:orderId', protect, addOrderTrackingEvent);

router.get('/customer/:cid',protect, authorize("customer", "admin"), getOrdersByCustomer);

router.get('/vendor/:vid',protect, authorize("vendor", "admin"), getOrdersByVendor);

router.get('/:orderId', protect, getOrder);

router.post('/:id/cancel', protect, authorize("customer"), cancelOrder);

module.exports = router
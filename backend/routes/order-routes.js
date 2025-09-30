const express = require('express');
const router = express.Router();
const { checkoutOrder, updateOrderStatus, getOrdersByCustomer} = require('../controllers/order-controller');

router.post('/checkout', checkoutOrder);

router.patch('/:orderId/status', updateOrderStatus);

router.get('/customer/:cid', getOrdersByCustomer);

module.exports = router
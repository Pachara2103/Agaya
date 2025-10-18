const express = require('express');
const router = express.Router();
const { requestReturn, processReturn ,getReturnReqs, getReturnReqsByVendor, submitReturnTrackingId} = require('../controllers/return-request-controller');
const {protect, authorize} = require('../middleware/auth');

router.get('/', protect, getReturnReqs);
router.get('/vendor', protect, authorize("admin", "vendor"), getReturnReqsByVendor);
router.post('/request', protect, authorize("customer"), requestReturn);
router.put('/:id/process', protect, authorize("admin", "vendor"), processReturn);
router.put("/tracking/:orderId", protect, submitReturnTrackingId); 

module.exports = router;
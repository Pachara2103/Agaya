const express = require('express');
const router = express.Router();
const { requestReturn, processReturn ,getReturnReqs, getReturnReqsByVendor} = require('../controllers/return-request-controller');
const {protect, authorize} = require('../middleware/auth');

router.get('/', protect, getReturnReqs);
router.get('/vendor', protect, authorize("admin", "vendor"), getReturnReqsByVendor);
router.post('/request', protect, authorize("customer"), requestReturn);
router.put('/:id/process', protect, authorize("admin", "vendor"), processReturn);

module.exports = router;
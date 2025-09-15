const express = require('express');
const router = express.Router();
const { createApplication, getMyApplicationStatus } = require('../controllers/vendor-application.controller');
const { protect } = require('../middleware/auth'); 

// @route   POST /api/v1/Agaya/vendor-applications
// @desc    
// @access  Private
router.route('/').post(protect, createApplication);

// @route   GET /api/v1/Agaya/vendor-applications/status
// @desc    
// @access  Private 
router.route('/status').get(protect, getMyApplicationStatus);

module.exports = router;
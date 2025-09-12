const express = require("express");
const {changePassword} = require('../controllers/change-password');
const router = express.Router();

const {protect} = require('../middleware/auth');

router.put('/change-password', protect, changePassword);

module.exports = router;
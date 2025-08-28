const express = require("express");
const {register, updatePassword} = require('../controllers/register');
const router = express.Router();

const {protect} = require('../middleware/auth');

router.post('/register', register);
router.put('/update-password', protect, updatePassword);

module.exports = router;

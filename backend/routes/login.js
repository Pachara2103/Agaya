const express = require('express');
const {login, getMe} = require('../controllers/login');
const router = express.Router();

const {protect, authorize} = require('../middleware/auth');

router.post('/login', login);
//May add 'authorize' to control about role
//But didn't neccessary in this case (register, log in)
router.get('/me', protect, authorize('User'), getMe);
//for example: router.get('/me', protect, authorize('Admin'), getMe); (authorize before getMe)

module.exports = router;

const express = require('express');
const passport = require('passport');
const {login, getMe, googleCallback} = require('../controllers/login');
const router = express.Router();

const {protect, authorize} = require('../middleware/auth');

router.post('/login', login);
//May add 'authorize' to control about role
//But didn't neccessary in this case (register, log in)
router.get('/me', protect, authorize('customer'), getMe);
//for example: router.get('/me', protect, authorize('Admin'), getMe); (protect, authorize then getMe)

//Google Login
// router.get('/google', passport.authenticate('google', {scope: ['profile', 'email']}));

//Google Callback
// router.get('/google/callback', passport.authenticate('google', {failureRedirect: '/login'}), googleCallback);

module.exports = router;

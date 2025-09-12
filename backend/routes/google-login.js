const express = require('express');
const passport = require('passport');
const {googleCallback} = require('../controllers/google-login');
const router = express.Router();

//Google login
router.get('/google', passport.authenticate('google', {scope: ['profile', 'email']}));

//Google callback
router.get('/google/callback', passport.authenticate('google', {failureRedirect: '/login'}), googleCallback);

module.exports = router;
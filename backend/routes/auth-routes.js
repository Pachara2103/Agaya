// backend/routes/auth.routes.js
const express = require('express');
const passport = require('passport');
const { register, login, logout, getMe, changePassword, googleCallback } = require('../controllers/auth-controller');
const { protect } = require('../middleware/auth');
const router = express.Router();

// --- Local Authentication ---
router.post('/register', register);
router.post('/login', login);
router.get('/logout', protect, logout);
router.get('/me', protect, getMe);
router.put('/change-password', protect, changePassword);

// --- Google OAuth ---
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get(
    '/google/callback',
    passport.authenticate('google', { failureRedirect: '/login', session: false }), // Use session: false for JWT
    googleCallback
);

module.exports = router;
const TokenBlacklist = require('../models/token-blacklist');
const jwt = require('jsonwebtoken');

exports.logout = async (req, res) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies && req.cookies.token) {
        token = req.cookies.token;
    }

    if (!token) {
        return res.status(400).json({success: false, message: 'No token found'});
    }
    
    try {
        const decoded = jwt.decode(token);
        const expiresAt = new Date(decoded.exp*1000);

        await TokenBlacklist.create({token, expiresAt});

        res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'development',
        sameSite: 'strict'
        });

        res.status(200).json({success: true, message: 'Logged out successfully'});
    } catch (err) {
        console.error('Logout error', err);
        res.status(500).json({success: false, message: 'Logout failed', error: err.message});
    }
};
const User = require('../models/user');
const TokenBlacklist = require('../models/token-blacklist');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validatePassword } = require('../utils/authUtils');


exports.register = async (userData) => {
    const { password, email } = userData;

    // Check for existing user by email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new Error('This email is already registered.');
    }

    // from utils that we will reuse
    const errors = validatePassword(password);
    if (errors.length > 0) {
        throw new Error("Password validation failed: " + errors.join(", "));
    }

    /* 
        ตรงนี้พอสร้างจริงอาจต้องมากัน userType: ["customer"]
        admin อาจต้องไปกดสร้างใน database เอง
        ตอนนี้ยังไม่ได้แก้สามารถสร้างได้ปกติ
    */
    const user = await User.create(userData);
    return user;
};

exports.login = async (email, password) => {
    if (!email || !password) {
        throw new Error("Please provide an email and password.");
    }

    // Find user by email and include the password field for comparison
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
        throw new Error("Invalid credentials.");
    }

    // Use the model's method to compare passwords
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
        throw new Error('Invalid credentials.');
    }

    return user;
};

exports.logout = async (token) => {
    if (!token) {
        throw new Error('No token found to invalidate.');
    }
    const decoded = jwt.decode(token);
    // Use token's expiration date for the blacklist entry's TTL
    const expiresAt = new Date(decoded.exp * 1000);
    await TokenBlacklist.create({ token, expiresAt });
};

exports.changePassword = async (userId, oldPassword, newPassword) => {
    // Validate the new password
    const errors = validatePassword(newPassword);
    if (errors.length > 0) {
        throw new Error("New password validation failed: " + errors.join(", "));
    }

    const user = await User.findById(userId).select('+password');
    if (!user) {
        throw new Error('User not found.');
    }

    // Check if the old password is correct
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
        throw new Error('Old password is incorrect.');
    }

    // Set the new password (hashing is handled by 'pre-save' hook)
    user.password = newPassword;
    await user.save();
};
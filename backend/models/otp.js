const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        index: true,
    },
    otp: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 300, // 60 * 5 minutes expired
    },
});

// Create the model from the schema
const Otp = mongoose.model('Otp', otpSchema);

module.exports = Otp;
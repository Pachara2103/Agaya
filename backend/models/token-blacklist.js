const mongoose = require('mongoose');

const TokenBlacklistSchema = new mongoose.Schema({
    token: {
        type: String, 
        require: true
    },
    expiresAt: {
        type: Date, 
        require: true
    }
});

TokenBlacklistSchema.index({expiresAt: 1}, {expireAfterSecond: 0});

module.exports = mongoose.model('TokenBlacklist', TokenBlacklistSchema);
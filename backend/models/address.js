const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    name: {
        type: String,
        maxlength: 72
    },
    phoneNumber: {
        type: String,
        match: /^[0-9]{10}$/ // ตรวจสอบว่าเป็นเลข 10 หลัก
    },
    address: {
        type: String,
        required: true,
        maxlength: 255
    }
});

module.exports = mongoose.models.address || mongoose.model('address', addressSchema);
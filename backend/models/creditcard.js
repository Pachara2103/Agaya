const mongoose = require('mongoose');

const creditCardSchema = new mongoose.Schema({
    user : {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }, 
    cardNumber: {
        type: String,
        required: [true, "Please enter card number"],
        unique: true,
        trim: true,
        match: /^[0-9]{16}$/,
        maxlength: [16, "Card number can not be more than 16 characters"],
        minlength: [16, "Card number must be 16 characters"]
    },
    cardExpiry: {
        type : String,
        required: [true, "Please enter card expiry date"],
        trim: true,
        match: /^([0-9]{2})\/([0-9]{2})$/,
        maxlength: [5, "Card expiry date can not be more than 5 characters"],
        minlength: [5, "Card expiry date must be 5 characters"]
    },
    cardCVC: {
        type: String,
        required: [true, "Please enter card CVC"],
        trim: true,
        match: /^[0-9]{3}$/,
    },
    cardName : {
        type: String,
        required: [true, "Please enter card holder name"],
        trim: true,
    }

}, {
    timestamps: true
});

module.exports = mongoose.model('CreditCard', creditCardSchema);

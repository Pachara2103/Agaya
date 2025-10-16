const mongoose = require("mongoose");

const returnProductSubschema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    },
}, { _id: false });

const returnRequestSchema = new mongoose.Schema({
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Order"
    },

    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Customer"
    },

    products: {
        type: [returnProductSubschema],
        required: true
    },

    reason: {
        type: String,
        required: true
    },

    status: {
        type: String,
        enum: ["PENDING", "APPROVED", "REJECTED", "COMPLETED"],
        default: "PENDING",
    },

    refundAmount: {
        type: Number,
        default: 0
    },

    response: {
        type: String,
    },

    requestDate: {
        type: Date,
        default: Date.now
    },

    resolvedDate: {
        type: Date
    },
});

module.exports = mongoose.model("ReturnRequest", returnRequestSchema);

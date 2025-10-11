const mongoose = require("mongoose");
// const { response } = require("../app"); ส่วนนี้ไว้ใช้ทำอะไรอ่ะ

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

    productId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Product"
    },

    quantity: {
        type: Number,
        required: true,
        min: 1
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

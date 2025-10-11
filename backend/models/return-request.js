const mongoose = require("mongoose");
const { response } = require("../app");

const returnRequestSchema = new mongoose.Schema({
    oid: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Order"
    },

    cid: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },

    pid: {
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

    refund_amount: {
        type: Number,
        default: 0
    },

    response: {
        type: String,
    },

    request_date: {
        type: Date,
        default: Date.now
    },

    resolved_date: {
        type: Date
    },
});

module.exports = mongoose.model("ReturnRequest", returnRequestSchema);

const mongoose = require("mongoose");

const reviewReportSchema = new mongoose.Schema(
  {
    reviewId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
      required: true,
    },
    vendorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
      required: true,
    },
    reason: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: ["PENDING", "REJECTED", "APPROVED"],
      default: "PENDING",
    },
    adminResponseDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

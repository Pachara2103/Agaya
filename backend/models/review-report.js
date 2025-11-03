const mongoose = require("mongoose");

const defaultResponse = {
    PENDING: "Your report is waiting for admin approval",
    REJECTED: "Admin reject your report",
    APPROVED: "Admin approved your report",
};

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
    adminResponse: {
      type: String,
      default: function () {
         return defaultResponse[this.status];
      }
    },
    adminResponseDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("ReviewReport", reviewReportSchema);
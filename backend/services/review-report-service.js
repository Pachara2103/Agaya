const ReviewReport = require("../models/review-report");
const createError = require("http-errors")

exports.createReviewReport = async (data) => {
  try {
    const report = await ReviewReport.create(data);
    return report;
  } catch (err) {
    throw(err);
  }
};

exports.getAllReviewReports = async (filters = {}) => {
  try {
    let query = {};
    if(filters.vendorId) query.vendorId = filters.vendorId;
    if(filters.status) query.status = filters.status;
    
    return await ReviewReport.find(query)
      .populate("reviewId")
      .sort({ createdAt: -1 });
  } catch (err) {
    throw(err);
  }
};

exports.getReviewReportById = async (id) => {
  try {
    const report = await ReviewReport.findById(id)
      .populate("reviewId")
      .populate("vendorId");
    if (!report) throw new createError(404, "Review report not found");
    return report;
  } catch (err) {
    throw(err);
  }
};

exports.updateReviewReport = async (id, data) => {
  try {
    const updated = await ReviewReport.findByIdAndUpdate(id, data, {
      new: true,
    });
    if (!updated) throw new createError(404, "Review report not found");
    return updated;
  } catch (err) {
    throw(err);
  }
};

exports.deleteReviewReport = async (id) => {
  try {
    const deleted = await ReviewReport.findByIdAndDelete(id);
    if (!deleted) throw new createError(404, "Review report not found");
    return deleted;
  } catch (err) {
    throw(err);
  }
};

exports.updateReviewReportStatus = async(id, status) => {
    try{
        validStatus = ["REJECTED", "APPROVED"];
        if (!validStatuses.includes(status)) {
            throw new createError(
                400, `Invalid status. Valid values: ${validStatus.join(", ")}`
            );
        }
        const reviewReport = await ReviewReport.findById(id);
        if(!reviewReport){
            throw new createError(404, "Review report not found");
        }
        if(reviewReport.status !== "PENDING"){
            throw new createError(400, "Report is already approved ar rejected");
        }
        reviewReport.status = status;
        await reviewReport.save();
        return reviewReport;
    } catch (err) {
        throw(err);
    }
}
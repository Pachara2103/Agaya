const ReviewReport = require("../models/review-report");
const {deleteReview} = require("./review-service");
const auditService = require('./audit-service');
const createError = require("http-errors")

exports.createReviewReport = async (data) => {
  try {
    const {reviewId, vendorId, reason} = data;
    vendorId = user._id;
    const report = await ReviewReport.create({reviewId, vendorId, reason});
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
    if(filters.reason) query.reason = filters.reason;
    
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
    if (!report) throw new createError(404, "Review report not found");
    return report;
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

exports.updateReviewReportStatus = async(id, status, response, user) => {
    try{
        const validStatus = ["REJECTED", "APPROVED"];
        if (!validStatus.includes(status)) {
            throw new createError(
                400, `Invalid status. Valid values: ${validStatus.join(", ")}`
            );
        }
        const reviewReport = await ReviewReport.findById(id);
        if(!reviewReport){
            throw new createError(404, "Review report not found");
        }
        if(reviewReport.status !== "PENDING"){
            throw new createError(400, "Report is already approved or rejected");
        }
        if(status == "APPROVED"){
            await deleteReview(reviewReport.reviewId, user);
        }
        reviewReport.status = status;
        if(response) reviewReport.adminResponse = response;
        reviewReport.adminResponseDate = new Date();
        
        await auditService.logAction({
            user: user._id, 
            action: "update", 
            resource: "ReviewReport", 
            resourceId: reviewReport._id, 
            changes: reviewReport
        });
        await reviewReport.save();
        return reviewReport;
    } catch (err) {
        throw(err);
    }
}
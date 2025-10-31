const reviewReportService = require("../services/review-report-service");
const createError = require("http-errors");

/**
 * @desc    Create a new review report
 * @route   POST /api/v1/Agaya/review-reports
 * @access  Public
 */
exports.createReviewReport = async (req, res, next) => {
  try {
    const report = await reviewReportService.createReviewReport(req.body);
    res.status(201).json({ success: true, data: report });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Get all review reports filter by vendorId, status, reason
 * @route   GET /api/v1/Agaya/review-reports
 * @access  Private
 */
exports.getAllReviewReports = async (req, res, next) => {
  try {
    const filters = req.query; // vendorId, status, reason
    const reports = await reviewReportService.getAllReviewReports(filters);
    res.status(200).json({ success: true, data: reports });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Get a single review report by ID
 * @route   GET /api/v1/Agaya/review-reports/:id
 * @access  Private
 */
exports.getReviewReportById = async (req, res, next) => {
  try {
    const report = await reviewReportService.getReviewReportById(req.params.id);
    res.status(200).json({ success: true, data: report });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Delete a review report by ID
 * @route   DELETE /api/v1/Agaya/review-reports/:id
 * @access  Private
 */
exports.deleteReviewReport = async (req, res, next) => {
  try {
    const deleted = await reviewReportService.deleteReviewReport(req.params.id);
    res.status(200).json({ success: true, data: {}});
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Update review report status, response (approve/reject)
 * @route   PUT /api/v1/Agaya/review-reports/:id
 * @access  Private
 */
exports.updateReviewReportStatus = async (req, res, next) => {
  try {
    const { status, response } = req.body;
    const user = req.user; 
    const updatedReport = await reviewReportService.updateReviewReportStatus(
      req.params.id,
      status,
      response,
      user
    );
    res.status(200).json({ success: true, data: updatedReport });
  } catch (err) {
    next(err);
  }
};

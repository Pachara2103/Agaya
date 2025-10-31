const express = require('express');
const router = express.Router();
const {getAllReviewReports, getReviewReportById, updateReviewReportStatus, createReviewReport, deleteReviewReport} = require('../controllers/review-report-controller');
const {protect, authorize} = require('../middleware/auth');

router.post("/", protect, authorize("vendor"), createReviewReport);

router.get("/", protect, getAllReviewReports);

router.get("/:id", protect, getReviewReportById);

router.delete("/:id", protect, authorize("vendor", "admin"), deleteReviewReport);

router.put("/:id", protect, authorize("admin"), updateReviewReportStatus);
module.exports = router;
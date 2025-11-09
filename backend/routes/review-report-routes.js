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

/**
 * @swagger
 * components:
 *   schemas:
 *     Review-Report:
 *       type: object
 *       required:
 *         - reviewId
 *         - vendorId
 *         - reason
 *       properties:
 *         reviewId:
 *           type: string
 *           description: The ID of the review being reported.
 *           example: "69043a1877a572b545fb4c58"
 *         vendorId:
 *           type: string
 *           description: The ID of the vendor who owns the product being reviewed.
 *           example: "6904389e789319c4c21dcf44"
 *         reason:
 *           type: string
 *           description: The reason why the vendor reported this review.
 *           example: "Contains misinfomation"
 *         status:
 *           type: string
 *           enum: ["PENDING", "REJECTED", "APPROVED"]
 *           default: "PENDING"
 *           description: The current status of the report, managed by admin.
 *         adminResponse:
 *           type: string
 *           description: Auto-generated admin response message based on status.
 *           example: "Your report is waiting for admin approval"
 *         adminResponseDate:
 *           type: string
 *           format: date-time
 *           description: Timestamp when admin responsed to the report.
 *           example: "2025-10-31T04:56:02.976+00:00"
 *       example:
 *         reviewId: "69043a1877a572b545fb4c58"
 *         vendorId: "6904389e789319c4c21dcf44"
 *         reason: "Contains misinfomation"
 *         status: "PENDING"
 *         adminResponse: "Admin approved your report"
 *         adminResponseDate: "2025-10-31T04:56:02.976+00:00"
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * tags:
 *   name: Review-Reports
 *   description: The review-reports managing API
 */

/**
 * @swagger
 * /review-reports:
 *   get:
 *     summary: Get list of review-reports filtered by vendorId, status, reason
 *     tags: [Review-Reports]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: vendorId
 *         schema:
 *           type: string
 *         required: true
 *         description: Filter reports by vendor ID
 *         example: "6904389e789319c4c21dcf44"
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: ["PENDING", "APPROVED", "REJECTED"]
 *         required: false
 *         description: Filter reports by status
 *         example: "PENDING"
 *       - in: query
 *         name: reason
 *         schema:
 *           type: string
 *         required: false
 *         description: Filter reports by reason text
 *         example: "Contains misinformation"
 *     responses:
 *       200:
 *         description: Successfully retrieved list of filtered review-reports
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Review-Report'
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Unauthorized user
 *       404:
 *         description: The review-report is not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /review-reports/{id}:
 *   get:
 *     summary: Get the review-report by its ID
 *     tags: [Review-Reports]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The review-report ID
 *     responses:
 *       200:
 *         description: Successfully retrieved the review-report
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Review-Report'
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Unauthorized user
 *       404:
 *         description: The review-report is not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /review-reports:
 *   post:
 *     summary: Create new review-report
 *     tags: [Review-Reports]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - reviewId
 *               - reason
 *             properties:
 *               reviewId:
 *                 type: string
 *                 description: The ID of the review being reported
 *                 example: "69043a1877a572b545fb4c58"
 *               reason:
 *                 type: string
 *                 description: Reason for reporting the review
 *                 example: "Contains misinformation or offensive content"
 *     responses:
 *       201:
 *         description: The review-report is successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Review-Report'
 *       400:
 *         description: Invalid input data or duplicate review-report
 *       401:
 *         description: Unauthorized user
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /review-reports/{id}:
 *   put:
 *     summary: Update the review-report by its ID
 *     tags: [Review-Reports]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The review-report ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum: ["PENDING", "REJECTED", "APPROVED"]
 *                 description: The new status for the report
 *                 example: "APPROVED"
 *               adminResponse:
 *                 type: string
 *                 description: Optional message from admin
 *                 example: "Admin approved your report"
 *     responses:
 *       200:
 *         description: The review-report is updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Review-Report'
 *       400:
 *         description: Invalid input data or report alerady finalized
 *       403:
 *         description: The user is not authorized
 *       404:
 *         description: The review-report is not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /review-reports/{id}:
 *   delete:
 *     summary: Delete the review-report by its ID
 *     tags: [Review-Reports]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The review-report ID
 *     responses:
 *       200:
 *         description: The review-report is deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   example: {}
 *       404:
 *         description: The review-report is not found
 *       500:
 *         description: Internal server error
 */
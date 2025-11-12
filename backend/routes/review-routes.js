const express = require("express");
const router = express.Router();
const {protect, authorize} = require('../middleware/auth');
const {
  createReview,
  getReviews,
  getReview,
  getReviewByTransaction,
  updateReview,
  deleteReview,
  replyReview,
  getReviewsByVendor,
  getReviewsForProductsByCustomer,
} = require("../controllers/review-controller");

router.route("/vendor").get(protect, authorize("vendor"), getReviewsByVendor);
router.post("/check-batch", getReviewsForProductsByCustomer);
router.route("/").get(getReviews).post(protect, authorize("customer", "vendor", "admin"), createReview);
router.route("/transaction/:transactionId").get(protect, getReviewByTransaction);
router.route("/:id").get(getReview).post(protect, authorize("vendor"), replyReview).put(protect, updateReview).delete(protect, deleteReview);

module.exports = router;

/**
 * @swagger
 * components:
 *   schemas:
 *     Review:
 *       type: object
 *       required:
 *         - transactionId
 *         - productId
 *         - customerId
 *         - vendorId
 *         - rating
 *       properties:
 *         transactionId:
 *           type: string
 *           description: The ID of the related Transaction
 *           example: "68ef6ea7f9e853a33bedb1af"
 *         productId:
 *           type: string
 *           description: The ID of the Product
 *           example: "68ef6e4ff9e853a33bedb193"
 *         customerId:
 *           type: string
 *           description: The ID of the Customer
 *           example: "6904389e789319c4c21dcf44"
 *         vendorId:
 *           type: string
 *           description: ObjectId of the Vendor
 *           example: "68ef39cbce8fd638e781919f"
 *         vendorResponse:
 *           type: string
 *           nullable: true
 *           description: Response from vendor
 *         reviewDate:
 *           type: string
 *           format: date-time
 *           description: When the review was created
 *         rating:
 *           type: number
 *           minimum: 0
 *           maximum: 5
 *         image:
 *           type: array
 *           items:
 *             type: string
 *             format: uri
 *         reviewContent:
 *           type: string
 *       example:
 *         transactionId: "68ef6ea7f9e853a33bedb1af"
 *         productId: "68ef6e4ff9e853a33bedb193"
 *         customerId: "6904389e789319c4c21dcf44"
 *         vendorId: "68ef39cbce8fd638e781919f"
 *         vendorResponse: null
 *         reviewDate: "2025-10-31T08:00:00.000Z"
 *         rating: 2
 *         reviewContent: "Great product!"
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * tags:
 *   name: Reviews
 *   description: The reviews managing API
 */

/**
 * @swagger
 * /reviews:
 *   get:
 *     summary: Get list of reviews (with pagination and optional product filter)
 *     tags: [Reviews]
 *     parameters:
 *       - in: query
 *         name: productId
 *         schema:
 *           type: string
 *         required: false
 *         description: Filter reviews by product id
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         required: false
 *         description: Current page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         required: false
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: Successfully retrieved list of reviews
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 reviews:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Review'
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     currentPage:
 *                       type: integer
 *                     totalPages:
 *                       type: integer
 *                     totalItems:
 *                       type: integer
 *                     itemsPerPage:
 *                       type: integer
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /reviews:
 *   post:
 *     summary: Create new review
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Review'
 *     responses:
 *       201:
 *         description: The review was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Review created successfully
 *                 data:
 *                   $ref: '#/components/schemas/Review'
 *       400:
 *         description: Invalid input data or duplicate review
 *       401:
 *         description: Unauthorized user
 *       404:
 *         description: The related transaction is not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /reviews/{id}:
 *   get:
 *     summary: Get the review by its id
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The review id
 *     responses:
 *       200:
 *         description: Successfully retrieved review
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Review'
 *       404:
 *         description: Review not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /reviews/{id}:
 *   put:
 *     summary: Update the review by its id
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The review id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rating:
 *                 type: number
 *                 example: 4
 *               reviewContent:
 *                 type: string
 *                 example: "สินค้าดี ส่งไว"
 *               image:
 *                 type: array
 *                 items:
 *                   type: string
 *                   examples: "https://example.com/review.png"
 *     responses:
 *       200:
 *         description: The review was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Review'
 *       400:
 *         description: Invalid input data
 *       403:
 *         description: The user is not authorized
 *       404:
 *         description: The review was not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /reviews/{id}:
 *   delete:
 *     summary: Delete the review by its id
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The review id
 *     responses:
 *       200:
 *         description: The review was deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Review deleted successfully
 *       400:
 *         description: The user is not authorized
 *       404:
 *         description: The review was not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /reviews/{id}:
 *   post:
 *     summary: Create new review reply
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The review id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Review'
 *     responses:
 *       200:
 *         description: The review reply was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Review'
 *       403:
 *         description: The user is not authorized
 *       404:
 *         description: The review is not found
 */

/**
 * @swagger
 * /reviews/transaction/{transactionId}:
 *   get:
 *     summary: Get a review associated with a transaction
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: transactionId
 *         schema:
 *           type: string
 *         required: true
 *         description: The transaction id
 *     responses:
 *       200:
 *         description: Successfully retrieved review
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Review'
 *       400:
 *         description: Transaction id is required
 *       404:
 *         description: Review not found for this transaction
 *       500:
 *         description: Internal server error
 */
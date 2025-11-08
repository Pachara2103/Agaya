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
  replyReview
} = require("../controllers/review-controller");

router.route("/").get(getReviews).post(protect, authorize("customer", "vender", "admin"), createReview);
router.route("/transaction/:transactionId").get(protect, getReviewByTransaction);
router.route("/:id").get(getReview).post(protect, authorize("vendor"), replyReview).put(protect, updateReview).delete(protect, deleteReview);

module.exports = router;

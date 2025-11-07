const express = require("express");
const router = express.Router();
const {protect, authorize} = require('../middleware/auth');
const {
  createReview,
  getReviews,
  getReview,
  updateReview,
  deleteReview,
  replyReview
} = require("../controllers/review-controller");

router.route("/").get(getReviews).post(protect, authorize("customer", "vender", "admin"), createReview);
router.route("/:id").get(getReview).post(protect, authorize("vendor"), replyReview).put(protect, authorize("admin"), updateReview).delete(protect, deleteReview);

module.exports = router;

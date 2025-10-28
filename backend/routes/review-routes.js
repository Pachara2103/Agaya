const express = require("express");
const router = express.Router();
const {protect, authorize} = require('../middleware/auth');
const {
  createReview,
  getReviews,
  getReview,
  updateReview,
  deleteReview,
} = require("../controllers/review-controller");

router.route("/").get(getReviews).post(createReview);
router.route("/:id").get(getReview).put(updateReview).delete(protect, deleteReview);

module.exports = router;

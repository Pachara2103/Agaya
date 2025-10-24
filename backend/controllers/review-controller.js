const reviewService = require("../services/review-service");

exports.createReview = async (req, res, next) => {
  try {
    const newReview = await reviewService.createReview(req.body);
  } catch (error) {
    next(error);
  }
};

exports.getReviews = async (req, res, next) => {
  try {
    const { productId } = req.query;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const result = await reviewService.getReviews(productId, page, limit);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

exports.getReview = async (req, res, next) => {
  try {
    const review = await reviewService.getReview(req.params.id);
    res.status(200).json(review);
  } catch (error) {
    next(error);
  }
};

exports.updateReview = async (req, res, next) => {
  try {
    const updatedReview = await reviewService.updateReview(
      req.params.id,
      req.body
    );
    res.status(200).json(updatedReview);
  } catch (error) {
    next(error);
  }
};

exports.deleteReview = async (req, res, next) => {
  try {
    await reviewService.deleteReview(req.params.id);
    res.status(200).json({ message: "Review deleted successfully" });
  } catch (err) {
    next(err);
  }
};

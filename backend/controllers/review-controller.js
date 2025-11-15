const reviewService = require("../services/review-service");

exports.createReview = async (req, res, next) => {
  try {
    const newReview = await reviewService.createReview(req.body, req.user);
    res.status(201).json(newReview);
  } catch (error) {
    next(error);
  }
};

exports.getReviews = async (req, res, next) => {
  try {
    const { productId, rating } = req.query;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const result = await reviewService.getReviews(productId, page, limit, rating);
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

exports.getReviewByTransaction = async (req, res, next) => {
  try {
    const review = await reviewService.getReviewByTransaction(req.params.transactionId);
    res.status(200).json(review);
  } catch (err) {
    next(err);
  }
};

exports.updateReview = async (req, res, next) => {
  try {
    // pass req.user so service can check ownership/admin rights
    const updatedReview = await reviewService.updateReview(
      req.params.id,
      req.body,
      req.user
    );
    res.status(200).json(updatedReview);
  } catch (error) {
    next(error);
  }
};

exports.deleteReview = async (req, res, next) => {
  try {
    await reviewService.deleteReview(req.params.id, req.user);
    res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    next(error);
  }
};

exports.replyReview = async (req, res, next) => {
  try {
    const reviewId = req.params.id;
    const userId = req.user._id;
    const { responseContent } = req.body;
    const replyReview = await reviewService.replyReview(reviewId, userId, responseContent);
    res.status(200).json(replyReview);
  } catch (error) {
    next(error);
  }
};

exports.getReviewsByVendor = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const { rating } = req.query;

    const result = await reviewService.getReviewsByVendor(userId, page, limit, rating);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

exports.getReviewsForProductsByCustomer = async (req, res, next) => {
  try {
    const { customerId, productIds } = req.body;

    if (!customerId || !productIds || !Array.isArray(productIds)) {
      return res.status(400).json({ success: false, message: "Missing customerId or productIds array" });
    }

    const reviews = await reviewService.findReviewsByCustomerAndProducts(customerId, productIds);

    res.status(200).json({ success: true, data: reviews });
  } catch (error) {
    next(error);
  }
};
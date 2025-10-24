const Review = require("../models/review");
const createError = require("http-errors");

exports.createReview = async (data) => {
  const {
    transactionId,
    productId,
    customerId,
    vendorId,
    vendorResponse,
    reviewDate,
    rating,
    reviewContent,
  } = data;

  const newReview = await Review.create({
    transactionId,
    productId,
    customerId,
    vendorId,
    vendorResponse,
    reviewDate,
    rating,
    reviewContent,
  });

  return newReview;
};

//{{URL}}/api/v1/Agaya/reviews?productId=XXX&page=XX&limit=XX

exports.getReviews = async (productId, page = 1, limit = 10) => {
  const skip = (page - 1) * limit;

  const filter = productId ? { productId: productId } : {};

  const reviews = await Review.find(filter)
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });

  const total = await Review.countDocuments(filter);
  return {
    reviews,
    pagination: {
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalItems: total,
      itemsPerPage: limit,
    },
  };
};

exports.getReview = async (id) => {
  const review = await Review.findById(id);
  return review;
};

exports.updateReview = async (id, updateData) => {
  const updatedReview = await Review.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });
  if (!updatedReview) {
    throw createError(404, "Review not found.");
  }

  return updatedReview;
};

exports.deleteReview = async (id) => {
  const deletedReview = await Review.findByIdAndDelete(id);
  if (!deletedReview) {
    throw createError(404, "Review not found.");
  }
  return deletedReview;
};

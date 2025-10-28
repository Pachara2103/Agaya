const Review = require("../models/review");
const Transaction = require("../models/transaction");
const Contain = require("../models/contain");
const createError = require("http-errors");

exports.createReview = async (data, user) => {
  const { transactionId, productId, customerId, vendorId, vendorResponse, reviewDate, rating, reviewContent } = data;
if(customerId !== user._id) throw createError(400, "User doesn't match - unauthorize.");
  const transaction = await Transaction.findById(transactionId);
  if (!transaction) throw createError(404, "Transaction not found.");
  const contain = await Contain.find({orderId: transaction.orderId, productId: productId});
  if (contain.length === 0) throw createError(404, "User does not purchase this product.");
  const review = await Review.find({productId: productId, customerId: customerId});
  console.log(review);
  if(review.length > 0) throw createError(400, "User has reviewed this product.");
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

  const reviews = await Review.find(filter).skip(skip).limit(limit).sort({ createdAt: -1 });

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

exports.deleteReview = async (id, user) => {
  const review = await Review.findById(id);
  if(review.customerId !== user._id && !user.userType.includes("admin")) throw createError(400, "User doesn't own this review.");
  const deletedReview = await Review.findByIdAndDelete(id);
  if (!deletedReview) {
    throw createError(404, "Review not found.");
  }
  return deletedReview;
};

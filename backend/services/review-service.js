const Review = require("../models/review");
const Transaction = require("../models/transaction");
const Contain = require("../models/contain");
const Product = require("../models/product");
const createError = require("http-errors");
const mongoose = require("mongoose");

exports.createReview = async (data, user) => {
  const { transactionId, productId, customerId, vendorId, rating, image, reviewContent } = data;

  console.log(555);
  console.log("customerId, user._id :", customerId, ", ", user._id);
  console.log(data);
  
  if(customerId !== user._id.toString()) throw createError(400, "User doesn't match - unauthorize.");
  
  const transaction = await Transaction.findById(transactionId);
  if (!transaction) throw createError(404, "Transaction not found.");
  
  const contain = await Contain.find({ orderId: transaction.orderId, productId: productId });
  if (contain.length === 0) throw createError(404, "User does not purchase this product.");
  
  const review = await Review.find({ productId: productId, customerId: customerId });
  // console.log(review);
  if (review.length > 0) throw createError(400, "User has reviewed this product.");

  // Try session + transaction
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const newReview = await Review.create(
      [{
        transactionId,
        productId,
        customerId,
        vendorId,
        rating,
        image,
        reviewContent,
      }], { session });

    const product = await Product.findById(productId, null, {session});
    const newProductSumOfRating = product.rating + rating;
    const newProductNumberOfReviews = product.numberOfReviews + 1;
    const newProductRating = newProductSumOfRating/newProductNumberOfReviews;
    const updatedProductData = {sumOfRating: newProductSumOfRating, numberOfReviews: newProductNumberOfReviews, rating: newProductRating};
    const updatedProduct = await Product.findByIdAndUpdate(productId, updatedProductData, {session});
    // console.log(newProductNumberOfReviews, newProductSumOfRating, newProductRating);

    await session.commitTransaction();
    return newReview;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
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

exports.getReviewByTransaction = async (transactionId) => {
  if (!transactionId) {
    throw createError(400, "transactionId is required.");
  }

  // Validate ObjectId to avoid casting errors
  if (!mongoose.Types.ObjectId.isValid(transactionId)) {
    return null; // treat invalid id as "no review"
  }

  // Use the raw transactionId value in the query and let Mongoose cast it to ObjectId.
  // Constructing an ObjectId via `mongoose.Types.ObjectId(transactionId)` can throw in
  // some runtime setups (needs `new`), so avoid calling the constructor directly.
  const review = await Review.findOne({ transactionId }).lean(); // may populate, but not necessary
    console.log('[getReviewByTransaction] transactionId=', transactionId);
    console.log('[getReviewByTransaction] review=', review);
  return review || null;
};

exports.updateReview = async (id, updateData, user) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const oldReview = await Review.findById(id).session(session);
    if (!oldReview) {
      throw createError(404, "Review not found.");
    }
    // Ownership check: allow only the review owner or admins to update
    if (user) {
      const isOwner = oldReview.customerId && oldReview.customerId.toString() === user._id.toString();
      const isAdmin = Array.isArray(user.userType) ? user.userType.includes("admin") : typeof user.userType === 'string' && user.userType.includes("admin");
      if (!isOwner && !isAdmin) {
        throw createError(403, "You are not authorized to update this review.");
      }
    } else {
      // no user provided - deny
      throw createError(403, "You are not authorized to update this review.");
    }
    const isRatingChanged = (updateData.rating !== undefined) && (updateData.rating !== oldReview.rating);
    const updatedReview = await Review.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
      session
    });
    if (!updatedReview) {
      throw createError(404, "Review not found.");
    }
    if (isRatingChanged) {
      const product = await Product.findById(oldReview.productId).session(session);
      if (!product) {
        throw createError(404, "Product not found.");
      }
      const newSumOfRating = product.sumOfRating - oldReview.sumOfRating + updatedReview.sumOfRating;
      const newAvgRating = newSumOfRating / product.numberOfReviews;

      await Product.findByIdAndUpdate(
        product._id,
        {
          sumOfRating: newSumOfRating,
          rating: newAvgRating
        },
        { session }
      );
    }
    await session.commitTransaction();
    return updatedReview;
  } catch(error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

exports.deleteReview = async (id, user) => {
  const review = await Review.findById(id);
  if (!review) {
    throw createError(404, "Review not found.");
  }
  if (review.customerId !== user._id && !user.userType.includes("admin")) throw createError(400, "User doesn't own this review.");

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const product = await Product.findById(review.productId, null, {session});

    const newProductSumOfRating = product.rating - review.rating;
    const newProductNumberOfReviews = product.numberOfReviews - 1;
    let newProductRating;
    if(newProductNumberOfReviews === 0) newProductRating = 0;
    else newProductRating = newProductSumOfRating/newProductNumberOfReviews;

    const updatedProductData = {sumOfRating: newProductSumOfRating, numberOfReviews: newProductNumberOfReviews, rating: newProductRating};
    const updatedProduct = await Product.findByIdAndUpdate(review.productId, updatedProductData, {session});

    const deletedReview = await Review.findByIdAndDelete(id, null, {session});

    await session.commitTransaction();
    return deletedReview;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

exports.replyReview = async (reviewId, vendorId, responseContent) => {
  const review = await Review.findById(reviewId);
  if (!review) throw createError(404, "Review not found.");

  if (review.vendorId.toString() !== vendorId.toString()) {
    throw createError(403, "You are not authorized to reply this review.");
  }

  review.vendorResponse = {
    content: responseContent,
    date: Date.now()
  };

  await review.save();
  return review;
};
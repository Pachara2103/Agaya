import React, { useState, useEffect } from "react";
import { getReviews } from "../../services/reviewService.js";
import { ReviewItem } from "./ReviewItem.jsx";

const ProductReviews = ({ productId, isOwner }) => {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState(null);

  const [ratingFilter, setRatingFilter] = useState(null);

  useEffect(() => {
    if (!productId) return;

    const fetchReviewsData = async (currentPage) => {
      try {
        setIsLoading(true);
        setError(null);

        const data = await getReviews(currentPage, 5, productId, ratingFilter);

        if (data && data.reviews) {
          setReviews(data.reviews);
          setPagination(data.pagination);
        } else {
          setReviews([]);
          setPagination(null);
          console.warn(
            "No review data returned or data format is incorrect",
            data
          );
        }
      } catch (err) {
        console.error("Error in ProductReviews:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviewsData(page);
  }, [productId, page, ratingFilter]);

  const handleRatingFilterChange = (newRating) => {
    console.log("Changing rating filter to:", newRating);
    setRatingFilter(newRating);
    setPage(1);
  };

  const handleNextPage = () => {
    if (pagination && page < pagination.totalPages) {
      setPage(page + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const renderFilterButtons = () => (
    <div className="flex flex-wrap gap-2 mb-6">
      {["All", 5, 4, 3, 2, 1].map((star) => {
        const ratingValue = star === "All" ? null : star;
        const isActive = ratingFilter === ratingValue;
        return (
          <button
            key={star}
            onClick={() => handleRatingFilterChange(ratingValue)}
            className={`px-4 py-2 rounded-lg text-m font-medium transition ${
              isActive
                ? "bg-[#B71F3B] text-white shadow"
                : "bg-gray-100 text-yellow-400 hover:bg-gray-200"
            }`}
          >
            {star === "All" ? "All Reviews" : `${"★".repeat(star)}`}
          </button>
        );
      })}
    </div>
  );

  const renderContent = () => {
    if (isLoading && reviews.length === 0) {
      return (
        <div className="text-center text-gray-500 py-12">
          Loading reviews...
        </div>
      );
    }

    if (error) {
      return (
        <div className="text-center text-red-500 py-12">Error: {error}</div>
      );
    }

    if (!isLoading && reviews.length === 0) {
      return (
        <div className="text-center text-gray-500">
          No reviews found
          {ratingFilter ? ` for ${"★".repeat(ratingFilter)}` : ""}.
        </div>
      );
    }

    return (
      <div className="space-y-6">
        {reviews.map((review) => (
          <ReviewItem key={review._id} review={review} isOwner={isOwner} />
        ))}
      </div>
    );
  };

  return (
    <div className="py-12">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Product Reviews</h2>

      {renderFilterButtons()}

      {renderContent()}

      {pagination && pagination.totalPages > 1 && (
        <div className="flex justify-between items-center mt-8">
          <button
            onClick={handlePrevPage}
            disabled={page === 1}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg shadow-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 transition"
          >
            Previous
          </button>
          <span className="text-gray-700">
            Page {pagination.currentPage || page} of {pagination.totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={!pagination || page === pagination.totalPages}
            className="px-4 py-2 bg-[#B71F3B]/70 text-white rounded-lg shadow-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#B71F3B] transition"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductReviews;

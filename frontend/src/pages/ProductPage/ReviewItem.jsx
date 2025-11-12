import { useState } from 'react';
import { FaUserCircle } from "react-icons/fa"; 
import { renderStars } from './ProductSubComponents.jsx';

export const ReviewItem = ({ review }) => {
  const [showFullReview, setShowFullReview] = useState(false);

  const comment = review.reviewContent || review.comment || "";
  const isLongReview = comment.length > 150;
  const reviewText = isLongReview && !showFullReview
    ? `${comment.substring(0, 150)}...`
    : comment;

  const displayName = review.transactionId?.orderId?.shippingAddress?.name
    || review.customerId?.username
    || 'Anonymous';

  const profileImageUrl = review.customerId?.profileImageUrl;
  const reviewImages = review.image || []; 

  const [imgError, setImgError] = useState(false);

  return (
    <div className="py-6 border-b border-gray-200">
      <div className="flex items-start mb-3">
        {profileImageUrl && !imgError ? (
          <img
            src={profileImageUrl}
            alt={`${displayName} profile`}
            className="h-10 w-10 rounded-full object-cover mr-3 flex-shrink-0 border border-gray-200"
            onError={() => setImgError(true)} 
          />
        ) : (
          <FaUserCircle className="h-10 w-10 text-gray-400 mr-3 flex-shrink-0" />
        )}

        <div className="flex-grow">
          <span className="font-semibold text-gray-800">
            {displayName}
          </span>
          <div className="flex items-center">
            {renderStars(review.rating)}
          </div>
        </div>

        <span className="text-sm text-gray-500 ml-auto flex-shrink-0">
          {new Date(review.createdAt).toLocaleDateString()}
        </span>
      </div>

      {/* Review Comment */}
      <p className="text-gray-600 leading-relaxed pl-13">
        {reviewText}
      </p>
      {isLongReview && (
        <button
          onClick={() => setShowFullReview(!showFullReview)}
          className="text-blue-600 hover:underline text-sm mt-2 pl-13"
        >
          {showFullReview ? 'Read Less' : 'Read More'}
        </button>
      )}

      {reviewImages.length > 0 && (
        <div className="flex gap-2 overflow-x-auto mt-4 pl-13">
          {reviewImages.map((imgUrl, index) => (
            <img
              key={index}
              src={imgUrl}
              alt={`Review image ${index + 1}`}
              className="h-24 w-24 object-cover rounded-lg border border-gray-200 flex-shrink-0 cursor-pointer"
              onClick={() => window.open(imgUrl, '_blank')}
            />
          ))}
        </div>
      )}

      {review.vendorResponse && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg ml-12 border border-gray-200">
          <span className="font-semibold text-gray-700">Store Reply:</span>
          <p className="text-gray-600 italic">{review.vendorResponse}</p>
        </div>
      )}
    </div>
  );
};
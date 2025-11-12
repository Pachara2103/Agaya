import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { createReview } from "../../services/reviewService";
import { API_URL } from "../../services/api";
import LoadingOverlay from "../../components/Common/LoadingOverlay.jsx";
import ExistingReviewDisplay from "./ExistingReviewDisplay";
import NewReviewItem from "./NewReviewItem";

function ReviewForm({
  productsToReview,
  productsAlreadyReviewed,
  vendorId,
  transactionId,
  customerId,
  onReviewSubmitted,
  userName,
  userImageUrl,
}) {
  const [reviewData, setReviewData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const MAX_IMAGES = 3;

  useEffect(() => {
    const initialState = {};
    productsToReview.forEach((product) => {
      initialState[product.productId] = {
        rating: 5,
        reviewContent: "",
        imageFiles: [],
        imagePreviews: [],
      };
    });
    setReviewData(initialState);
  }, [productsToReview]);

  const handleRatingChange = (productId, newRating) => {
    setReviewData((prev) => ({
      ...prev,
      [productId]: { ...prev[productId], rating: newRating },
    }));
  };

  const handleContentChange = (productId, newContent) => {
    setReviewData((prev) => ({
      ...prev,
      [productId]: { ...prev[productId], reviewContent: newContent },
    }));
  };

  const handleFileChange = (productId, files) => {
    if (!files || files.length === 0) return;

    setReviewData((prev) => {
      const currentProduct = prev[productId];
      const currentCount = currentProduct.imageFiles.length;
      const availableSlots = MAX_IMAGES - currentCount;

      if (availableSlots <= 0) {
        setError(
          `[${productsToReview.find((p) => p.productId === productId).name}] สามารถอัพโหลดได้สูงสุด ${MAX_IMAGES} รูปเท่านั้น`
        );
        return prev;
      }

      const newFiles = Array.from(files);
      const filesToAdd = newFiles.slice(0, availableSlots);
      const updatedFiles = [...currentProduct.imageFiles, ...filesToAdd];
      const newPreviews = filesToAdd.map((file) => URL.createObjectURL(file));
      const updatedPreviews = [...currentProduct.imagePreviews, ...newPreviews];

      if (newFiles.length > availableSlots) {
        setError(
          `[${productsToReview.find((p) => p.productId === productId).name}] เลือกได้เพียง ${availableSlots} รูปเท่านั้น (สูงสุด ${MAX_IMAGES} รูป)`
        );
      } else {
        setError("");
      }

      return {
        ...prev,
        [productId]: {
          ...currentProduct,
          imageFiles: updatedFiles,
          imagePreviews: updatedPreviews,
        },
      };
    });
  };

  const handleRemoveImage = (productId, indexToRemove) => {
    setReviewData((prev) => {
      const currentProduct = prev[productId];
      URL.revokeObjectURL(currentProduct.imagePreviews[indexToRemove]);

      const updatedFiles = currentProduct.imageFiles.filter(
        (_, index) => index !== indexToRemove
      );
      const updatedPreviews = currentProduct.imagePreviews.filter(
        (_, index) => index !== indexToRemove
      );

      setError("");

      return {
        ...prev,
        [productId]: {
          ...currentProduct,
          imageFiles: updatedFiles,
          imagePreviews: updatedPreviews,
        },
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const productIdsToReview = Object.keys(reviewData);
    for (const productId of productIdsToReview) {
      if (reviewData[productId].rating === 0) {
        const productName = productsToReview.find(
          (p) => p.productId === productId
        ).name;
        setError(`กรุณาให้คะแนนสินค้า [${productName}] (อย่างน้อย 1 ดาว)`);
        return;
      }
    }

    setIsSubmitting(true);

    try {
      const token = Cookies.get("token");
      const allUploadPromises = [];
      const reviewPayloads = [];

      for (const productId of productIdsToReview) {
        const review = reviewData[productId];
        const imagePromises = review.imageFiles.map((file) => {
          const fd = new FormData();
          fd.append("image", file);
          return axios.post(`${API_URL}/upload`, fd, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          });
        });
        allUploadPromises.push(Promise.all(imagePromises));
      }

      const uploadResults = await Promise.all(allUploadPromises);

      for (let i = 0; i < productIdsToReview.length; i++) {
        const productId = productIdsToReview[i];
        const review = reviewData[productId];
        const uploadedImageUrls = uploadResults[i]
          .map((res) => res?.data?.imageUrl)
          .filter(Boolean);

        reviewPayloads.push({
          customerId,
          transactionId,
          productId,
          vendorId,
          rating: review.rating,
          reviewContent: review.reviewContent,
          image: uploadedImageUrls,
        });
      }

      await Promise.all(reviewPayloads.map((payload) => createReview(payload)));

      Object.values(reviewData).forEach((review) => {
        review.imagePreviews.forEach((url) => URL.revokeObjectURL(url));
      });

      alert("สร้างรีวิวสำเร็จ ขอบคุณสำหรับการรีวิว!");
      onReviewSubmitted();
    } catch (err) {
      console.error("Failed to submit review(s):", err);
      setError(err.message || "เกิดข้อผิดพลาด ไม่สามารถส่งรีวิวได้");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (productsToReview.length === 0 && productsAlreadyReviewed.length === 0)
    return null;

  return (
    <>
      {isSubmitting && <LoadingOverlay />}

      <form onSubmit={handleSubmit}>
        {productsAlreadyReviewed.map((product) => (
          <ExistingReviewDisplay
            key={product.productId}
            product={product}
            userName={userName}
            userImageUrl={userImageUrl}
          />
        ))}

        {productsToReview.length > 0 && (
          <div className="flex items-center gap-3 mb-4 p-4">
            <img
              src={
                userImageUrl || "https://placehold.co/40x40/eee/ccc?text=User"
              }
              alt="Profile"
              className="w-10 h-10 rounded-full object-cover"
            />
            <span className="font-semibold text-gray-800">
              {userName || "Customer Name"}
            </span>
          </div>
        )}

        {productsToReview.map((product) =>
          reviewData[product.productId] ? (
            <NewReviewItem
              key={product.productId}
              product={product}
              reviewState={reviewData[product.productId]}
              onRatingChange={handleRatingChange}
              onContentChange={handleContentChange}
              onFileChange={handleFileChange}
              onFileRemove={handleRemoveImage}
            />
          ) : null
        )}

        {error && <p className="text-red-500 text-sm p-4">{error}</p>}

        {productsToReview.length > 0 && (
          <div className="flex justify-end p-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="cursor-pointer px-8 py-3 bg-teal-500 text-white font-semibold rounded-md hover:bg-teal-600 disabled:bg-gray-400"
            >
              {isSubmitting ? "กำลังส่ง . . ." : "Send All Reviews"}
            </button>
          </div>
        )}
      </form>
    </>
  );
}

export default ReviewForm;

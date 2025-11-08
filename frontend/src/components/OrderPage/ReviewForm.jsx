import React, {useState, useRef, useEffect} from "react";
import axios from "axios";
import Cookies from "js-cookie";
import {StarRating} from "./StarRating";
import {FaImage} from "react-icons/fa";
import { createReview, getReviews, getReview, updateReview, deleteReview } from "../../libs/reviewService";
import { API_URL } from "../../libs/api";

function ReviewForm({productId, vendorId, transactionId, customerId, onReviewSubmitted, userName, userImageUrl, existingReview}) {
    const [rating, setRating] = useState(existingReview ? existingReview.rating : 0);
    const [reviewContent, setReviewContent] = useState(existingReview ? existingReview.reviewContent : "");
    const [imageFiles, setImageFiles] = useState([]);
    const [existingImages, setExistingImages] = useState(existingReview ? existingReview.image : []);
    
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");
    const fileInputRef = useRef(null);

    useEffect(() => {
        // debug when prop changes
        console.log('[ReviewForm] existingReview prop changed:', existingReview);
    }, [existingReview]);

    // keep internal state in sync when an existingReview is passed/updated
    useEffect(() => {
        if (!existingReview) return;
        try {
            // only populate if the review matches this product
            const reviewProductId = existingReview.productId ? String(existingReview.productId) : null;
            if (reviewProductId && String(productId) === reviewProductId) {
                setRating(existingReview.rating || 0);
                setReviewContent(existingReview.reviewContent || "");
                setExistingImages(existingReview.image || []);
            }
        } catch (e) {
            console.warn('Failed to sync existingReview into form state', e);
        }
    }, [existingReview, productId]);

    const handleFileChange = (event) => {
        if (event.target.files) {
            setImageFiles(Array.from(event.target.files));
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (rating === 0) {
            setError("กรุณาให้คะแนนสินค้า (อย่างน้อย 1 ดาว)");
            return;
        }
        setIsSubmitting(true);
        setError("");

        try {
            const token = Cookies.get("token");
            let newlyUploadedUrls = [];

            if (imageFiles.length > 0) { //อัปโหลดเฉพาะรูปใหม่
                // The backend upload route accepts a single file field named 'image'
                // so upload files one-by-one and collect returned imageUrl
                for (let file of imageFiles) {
                    const fd = new FormData();
                    fd.append('image', file);
                    const uploadRes = await axios.post(`${API_URL}/upload`, fd, {
                        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' }
                    });
                    // upload route returns { imageUrl }
                    if (uploadRes?.data?.imageUrl) newlyUploadedUrls.push(uploadRes.data.imageUrl);
                }
            }

            const finalImageUrls = [...existingImages, ...newlyUploadedUrls];

            const reviewPayload = {
                customerId: customerId,
                transactionId: transactionId,
                productId: productId,
                vendorId: vendorId,
                rating: rating,
                reviewContent: reviewContent,
                image: finalImageUrls
            };

            if (existingReview) {
                // await axios.put(`${API_URL}/reviews/${existingReview._id}`, reviewPayload, {
                //     headers: { Authorization: `Bearer ${token}` }
                // });
                await updateReview(existingReview._id, reviewPayload);
                alert('อัปเดตรีวิวสำเร็จ!');
            } else {
                // await axios.post(`${API_URL}/reviews`, reviewPayload, {
                //     headers: { Authorization: `Bearer ${token}` }
                // });
                await createReview(reviewPayload);
                alert('สร้างรีวิวสำเร็จ ขอบคุณสำหรับการรีวิว!');
            }
            onReviewSubmitted();
        } catch(err) {
            console.error("Failed to submit review:", err);
            setError(err.response?.data?.message || "เกิดข้อผิดพลาด ไม่สามารถส่งรีวิวได้");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mt-4 p-4 border-t border-gray-200 space-y-4">
            <div className="flex items-center gap-3 mb-4">
                <img
                    src={userImageUrl || 'https://placehold.co/40x40/eee/ccc?text=User'}
                    alt="Profile"
                    className="w-10 h-10 rounded-full object-cover"
                />
                <span className="font-semibold text-gray-800">{userName || "Customer Name"}</span>
            </div>
            
            <div className="flex items-center gap-4">
                <span className="font-semibold text-gray-700">ให้คะแนนสินค้า:</span>
                <StarRating 
                    initialRating={rating}
                    onRatingChange={setRating}
                />
            </div>

            <textarea
                value={reviewContent}
                onChange={(e) => setReviewContent(e.target.value)}
                placeholder="เขียนรีวิวของคุณที่นี่ . . ."
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-black"
                rows="4"
            />

            {existingImages.length > 0 && (
                <div className="mb-2">
                    <span className="text-sm font-semibold text-gray-600">รูปภาพเดิมของคุณ:</span>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {existingImages.map((imgUrl, index) => (
                            <img
                                key={index}
                                src={imgUrl}
                                alt={`Existing review ${index + 1}`}
                                className="w-20 h-20 object-cover rounded-md border"
                            />
                        ))}
                    </div>
                </div>
            )}

            <div className="flex items-center gap-4">
                <input
                    type="file"
                    multiple
                    accept="image/png, image/jpeg"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                />
                <button
                    type="button"
                    onClick={() => fileInputRef.current.click()}
                    className="cursor-pointer flex items-center gap-2 px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
                >    
                    <FaImage className="text-gray-600"/>
                    <span className="text-black">เพิ่มรูปภาพ</span>
                </button>
                {imageFiles.length > 0 && (
                    <span className="text-sm text-gray-500">เลือกแล้ว {imageFiles.length} รูป</span>
                )}
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <div className="flex justify-end">
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="cursor-pointer px-8 py-3 bg-teal-500 text-white font-semibold rounded-md hover:bg-teal-600 disabled:bg-gray-400"
                >
                    {isSubmitting ? "Sending . . ." : (existingReview ? "Update Review" : "Send Review")}
                </button>
            </div>
        </form>
    );
}

export default ReviewForm;
import React, {useState, useRef} from "react";
import axios from "axios";
import Cookies from "js-cookie";
import {StarRating} from "./StarRating";
import {FaImage} from "react-icons/fa";

function ReviewForm({productId, vendorId, transactionId, onReviewSubmitted, userName, userImageUrl, existingReview}) {
    const [rating, setRating] = useState(existingReview ? existingReview.rating : 0);
    const [reviewContent, setReviewContent] = useState(existingReview ? existingReview.reviewContent : "");
    const [imageFiles, setImageFiles] = useState([]);
    const [existingImages, setExistingImages] = useState(existingReview ? existingReview.image : []);
    
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");
    const fileInputRef = useRef(null);

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
                const formData = new FormData();
                for (let file of imageFiles) {
                    formData.append('images', file);
                }

                ///////
                const uploadRes = await axios.post("", formData, {
                    headers: {"Content-Type": "multipart/form-data"}
                });
                newlyUploadedUrls = uploadRes.data.imageUrls; //have to connect with backend
            }

            const finalImageUrls = [...existingImages, ...newlyUploadedUrls];

            const reviewPayload = {
                transactionId: transactionId,
                productId: productId,
                vendorId: vendorId,
                rating: rating,
                reviewContent: reviewContent,
                image: finalImageUrls
            };

            if (existingReview) {
                ////////////////
                await axios.put(`http://localhost:5000/api/v1/reviews/${existingReview._id}`, reviewPayload, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                alert('อัปเดตรีวิวสำเร็จ!');
            } else {
                /////////////
                await axios.post('http://localhost:5000/api/v1/reviews', reviewPayload, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                alert('ขอบคุณสำหรับการรีวิว!');
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
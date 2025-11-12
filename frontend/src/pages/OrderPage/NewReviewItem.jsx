import React, { useRef } from "react";
import { StarRating } from "./StarRating";
import { FaImage, FaTimes } from "react-icons/fa";

function NewReviewItem({
    product,
    reviewState,
    onRatingChange,
    onContentChange,
    onFileChange,
    onFileRemove
}) {
    const fileInputRef = useRef(null);
    const MAX_IMAGES = 3;
    const { rating, reviewContent, imageFiles, imagePreviews } = reviewState;
    // console.log("NewReviewItem reviewState:", reviewState);
    const handleFileSelect = (event) => {
        onFileChange(product.productId, event.target.files);
        event.target.value = ""; // Reset input
    };

    return (
        <div className="mt-4 p-4 border-t border-gray-200 space-y-4">
            {/* header */}
            <div className="flex items-center gap-4">
                <img
                    src={product.image[0]}
                    alt={product.name}
                    className="w-16 h-16 object-contain rounded-md border"
                />
                <span className="font-semibold text-gray-800">{product.name}</span>
            </div>

            <div className="ml-20 space-y-4">
                <div className="flex items-center gap-4">
                    <span className="font-semibold text-gray-700">ให้คะแนนสินค้า:</span>
                    <StarRating
                        initialRating={rating}
                        onRatingChange={(newRating) => onRatingChange(product.productId, newRating)}
                    />
                </div>

                <textarea
                    value={reviewContent}
                    onChange={(e) => onContentChange(product.productId, e.target.value)}
                    placeholder="เขียนรีวิวของคุณที่นี่ . . ."
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-black"
                    rows="4"
                />
                {/* image preview */}
                {imagePreviews.length > 0 && (
                    <div className="space-y-2">
                        <span className="text-sm font-semibold text-gray-600">
                            รูปภาพที่เลือก ({imagePreviews.length}/{MAX_IMAGES}):
                        </span>
                        <div className="flex flex-wrap gap-3">
                            {imagePreviews.map((preview, index) => (
                                <div key={index} className="relative group">
                                    <img
                                        src={preview}
                                        alt={`Preview ${index + 1}`}
                                        className="w-24 h-24 object-cover rounded-md border-2 border-gray-300"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => onFileRemove(product.productId, index)}
                                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 shadow-md"
                                    >
                                        <FaTimes size={14} />
                                    </button>
                                </div>
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
                        onChange={handleFileSelect}
                        className="hidden"
                        disabled={imageFiles.length >= MAX_IMAGES}
                    />
                    <button
                        type="button"
                        onClick={() => fileInputRef.current.click()}
                        disabled={imageFiles.length >= MAX_IMAGES}
                        className={`cursor-pointer flex items-center gap-2 px-4 py-2 rounded-md ${imageFiles.length >= MAX_IMAGES
                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                : 'bg-gray-200 hover:bg-gray-300'
                            }`}
                    >
                        <FaImage className="text-gray-600" />
                        <span className="text-black">
                            {imageFiles.length >= MAX_IMAGES ? 'ครบ 3 รูปแล้ว' : 'เพิ่มรูปภาพ'}
                        </span>
                    </button>
                    {imageFiles.length > 0 && imageFiles.length < MAX_IMAGES && (
                        <span className="text-sm text-gray-500">
                            เพิ่มได้อีก {MAX_IMAGES - imageFiles.length} รูป
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}

export default NewReviewItem;
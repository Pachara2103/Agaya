import { FaStar } from "react-icons/fa";

function ExistingReviewDisplay({ product, userName, userImageUrl }) {
    const { reviewData } = product;
    console.log("ExistingReviewDisplay reviewData:", reviewData);
    if (!reviewData) return null; 

    return (
        <div className="mt-4 p-4 border-t border-gray-200 space-y-4 bg-gray-50">
            <div className="flex items-center gap-4">
                <img
                    src={product.image[0]}
                    alt={product.name}
                    className="w-16 h-16 object-contain rounded-md border"
                />
                <span className="font-semibold text-gray-800">{product.name}</span>
            </div>

            <div className="ml-20 space-y-4">
                <div className="flex items-center gap-3">
                    <img
                        src={userImageUrl || 'https://placehold.co/40x40/eee/ccc?text=User'}
                        alt="Profile"
                        className="w-10 h-10 rounded-full object-cover"
                    />
                    <span className="font-semibold text-gray-800">{userName || "Customer Name"}</span>
                </div>

                <div className="flex items-center gap-4">
                    <span className="font-semibold text-gray-700">คะแนนของคุณ:</span>
                    <div className="flex space-x-1">
                        {[...Array(5)].map((_, index) => (
                            <FaStar
                                key={index}
                                color={index < reviewData.rating ? "#ffc107" : "#e4e5e9"}
                                size={24}
                            />
                        ))}
                    </div>
                </div>

                <div className="p-3 bg-white border border-gray-300 rounded-md">
                    <p className="text-gray-800">{reviewData.reviewContent}</p>
                </div>

                {reviewData.image && reviewData.image.length > 0 && (
                    <div>
                        <span className="text-sm font-semibold text-gray-600">รูปภาพ:</span>
                        <div className="flex flex-wrap gap-2 mt-2">
                            {reviewData.image.map((imgUrl, index) => (
                                <img
                                    key={index}
                                    src={imgUrl}
                                    alt={`Review ${index + 1}`}
                                    className="w-20 h-20 object-cover rounded-md border"
                                />
                            ))}
                        </div>
                    </div>
                )}
                <p className="text-sm text-green-600 font-medium">คุณได้รีวิวสินค้านี้แล้ว</p>
            </div>
        </div>
    );
}

export default ExistingReviewDisplay;
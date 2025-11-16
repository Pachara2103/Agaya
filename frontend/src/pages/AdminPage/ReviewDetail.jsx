import { FaStar } from "react-icons/fa6";

export const ReviewDetail = ({customerName, customerId, rating, content}) => {

    return (
        <>
            <div className="flex flex-col gap-2 min-h-30 bg-[#f8f8f8ff] text-black p-4">
                <div><span className="font-[600]">{customerName} : {customerId}</span></div>
                <div className="flex items-center">
                    <span className="font-[600]">Rating: </span>
                    {[...Array(5)].map((star, index) => {
                        const ratingValue = index + 1;
                        return (
                            <FaStar
                                key={index}
                                size={20}
                                color={ratingValue <= rating ? "#ffc107" : "#e4e5e9"}
                            />
                        );
                    })}
                </div>
                <div>
                    <span className="font-[600]">Review content: </span>
                    <div className="w-full p-3 bg-white border border-gray-300 rounded-md shadow-sm min-h-[100px] whitespace-pre-wrap">
                        {content || <span className="text-gray-400">No review content provided.</span>}
                    </div>
                </div>
            </div>
        </>
    );
}
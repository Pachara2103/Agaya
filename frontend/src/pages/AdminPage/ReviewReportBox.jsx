import { useState, useEffect } from "react";
import { getVendorName } from "../../services/reviewReportService";
import { getReview } from "../../services/reviewService";
import { ReviewDetail } from "./ReviewDetail";
import { AdminResponse } from "./AdminResponse";

const formatDate = (isoString) => {
    const date = new Date(isoString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
};

const formatTime = (isoString) => {
    const date = new Date(isoString);
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    return `${hours}/${minutes}/${seconds}`;
};

export function ReviewReportBox({data, onReviewReportUpdate}) {
    const [vendorName, setVendorName] = useState("");
    const [user, setUser] = useState(null);
    // const [review, setReview] = useState(null);
    const {_id, vendorId, reason, status, createdAt, reviewId:review} = data;
    const reqDate = formatDate(createdAt || "2025-10-15T10:49:08.377Z");
    const time = formatTime(createdAt || "2025-10-15T10:49:08.377Z");
    const fetchVendorName = async () => {
        const user = await getVendorName(vendorId);
        console.log("user: ", user);
        console.log("data: ", data);
        console.log("review: ", review.rating);
        setVendorName(user.data.email);
        setUser(user);
    };
    //old review id 69043a1877a572b545fb4c58
    //new review id 6910a694709c4f5e6c7df2a6

    // const fetchReview = async () => {
    //     console.log("reviewId: ", reviewId);
    //     const review = await getReview(reviewId);
    //     console.log("review: ", review);
    //     setReview(review);
    // };

    const statusColor = (status) => {
        return status == "PENDING"
        ? "bg-yellow-500"
        : status === "APPROVED"
        ? "bg-blue-900"
        : "bg-white";
    };

    useEffect(() => {
        fetchVendorName();
        // fetchReview();
    }, []);

    const [detailState, setDetailState] = useState(false);

    return (
        <>
            <div>
                <div className="flex w-full min-h-20 bg-white shadow-[0_0_1px_1px_rgba(221,211,211,0.7)] p-2">
                    <div className="flex flex-col flex-4 bg-white">
                        <div className="flex-1 flex items-center gap-4">
                            <span className="font-[400] text-black text-[12px]">
                                {vendorName}
                            </span>
                        </div>
                        <div className="flex-1 flex items-center gap-4">
                            <span className="font-[100] text-black text-[12px]">
                                {reqDate}
                            </span>
                            <span className="font-[100] text-black text-[12px]">
                                {time}
                            </span>
                        </div>
                        <div className="flex-1 flex items-center gap-4">
                            <span>
                                <span className="font-[600] text-black text-[12px]">
                                    {reason}
                                </span>
                            </span>
                        </div>
                    </div>
                    <div className="flex-3 flex justify-center pt-1 bg-white">
                        <span className="h-5 p-1 font-[600] text-black text-[14px]">
                            Status:{" "}
                        </span>
                        <span
                            className={`flex items-center justify-center rounded-full w-22 h-5 ${statusColor(
                                status
                            )} p-1 text-[12px]`}
                        >
                            {status}
                        </span>
                    </div>
                    <div className="flex-3 flex items-center justify-center">
                        <div
                            className="flex items-center justify-center h-10 w-24 bg-[#48B3AF] text-white font-[100] cursor-pointer rounded-md"
                            onClick={() => setDetailState(!detailState)}
                        >
                            {detailState ? "Close Detail" : "Detail"}
                        </div>
                    </div>
                </div>
                {/* detail */}
                {detailState ? (
                    <>
                        {ReviewDetail(user.data.email, user.data._id, review.rating, review.reviewContent)}
                        {status === "PENDING" && (
                            <AdminResponse
                                reviewId={_id}
                                onProcessComplete={onReviewReportUpdate}
                            />
                        )}
                    </>
                ) : (
                    <></>
                )}
            </div>
        </>
    );
};
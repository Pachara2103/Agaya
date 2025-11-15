import { useState, useEffect, useCallback } from "react";
import { getVendorName } from "../../services/reviewReportService";
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
    const {_id, vendorId, reason, status, createdAt, reviewId:review} = data;
    const reqDate = formatDate(createdAt || "2025-10-15T10:49:08.377Z");
    const time = formatTime(createdAt || "2025-10-15T10:49:08.377Z");
    
    const fetchVendorName = useCallback(async () => {
        if (!vendorId) {
            console.error("No vendorId provided for report:", _id);
            return; 
        }
        // console.log("vendorId: ", vendorId);
        try {
            const user = await getVendorName(vendorId);

            if (user && user.data) {
                setVendorName(user.data.email);
                setUser(user.data);
                // console.log("Fetched user: ", user.data);
            } else {
                console.warn("Vendor not found for ID:", vendorId);
            }
            // console.log("Report data: ", data);
            // console.log("Review object: ", review);
        } catch (err) {
            console.error(`Failed to fetch vendor ${vendorId}:`, err);
        }
    }, [vendorId, _id]);

    const statusColor = (status) => {
        return status == "PENDING"
        ? "bg-yellow-500"
        : status === "APPROVED"
        ? "bg-blue-900"
        : status === "REJECTED"
        ? "bg-red-800"
        : "bg-white";
    };

    useEffect(() => {
        fetchVendorName();
    }, [fetchVendorName, status]);

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
                    {status !== "APPROVED" ? (
                        <div className="flex-3 flex items-center justify-center">
                            <div
                                className="flex items-center justify-center h-10 w-24 bg-[#48B3AF] text-white font-[100] cursor-pointer rounded-md"
                                onClick={() => setDetailState(!detailState)}
                            >
                                {detailState ? "Close Detail" : "Detail"}
                            </div>
                        </div>
                    ) : (
                        <div className="flex-3 flex font-bold text-black h-10 w-24 items-center justify-center">Review deleted</div>
                    )}
                </div>
                {/* detail */}
                {detailState && (
                    <>
                        {user && review ? (
                            <ReviewDetail
                                customerName={user.email}
                                customerId={user._id}
                                rating={review.rating}
                                content={review.reviewContent}
                            />
                        ) : (
                            <div className="p-4 text-gray-500">ไม่พบรายละเอียดรีวิว (อาจถูกลบไปแล้ว)</div>
                        )}
                        {status === "PENDING" && (
                            <AdminResponse
                                reviewReportId={_id}
                                onProcessComplete={onReviewReportUpdate}
                                user={user}
                            />
                        )}
                    </>
                )}
            </div>
        </>
    );
};
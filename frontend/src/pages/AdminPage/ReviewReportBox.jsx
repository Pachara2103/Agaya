import { useState, useEffect } from "react";
import { getVendorName } from "../../services/reviewReportService";

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
    const {_id, vendorId, reason, status, createdAt} = data;
    const reqDate = formatDate(createdAt || "2025-10-15T10:49:08.377Z");
    const time = formatTime(createdAt || "2025-10-15T10:49:08.377Z");
    const fetchVendorName = async () => {
        const res = await getVendorName(vendorId);
        setVendorName(res.data.email);
    };
    const statusColor = (status) => {
        return status == "PENDING"
        ? "bg-yellow-500"
        : status === "APPROVED"
        ? "bg-blue-900"
        : "bg-white";
    };

    useEffect(() => {
        fetchVendorName();
        console.log(vendorName);
    }, []);

    const [detailState, setDetailState] = useState(false);

    return (
        <>
            <div>
                <div className="flex w-full min-h-20 bg-white shadow-[0_0_1px_1px_rgba(221, 211, 211,0.7)] p-2">
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
                            className="flex items-center justify-center h-10 w-24 bg-[#48B3AF] text-white font-[100] cursor-pointer"
                        >
                            {detailState ? "Close Detail" : "Detail"}
                        </div>
                    </div>
                </div>
                {/* detail */}
            </div>
        </>
    );
};
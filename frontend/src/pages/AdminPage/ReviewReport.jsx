import { useState, useEffect } from "react";
import { getReviewReports } from "../../services/reviewReportService";
import { ReviewReportBox } from "./ReviewReportBox";
import { StatusButton } from "./DisputeComponent/statusButton";

function ReviewReport() {
    const [reviewReports, setReviewReports] = useState(null);
    const fetchReviewReports = async () => {
        const res = await getReviewReports();
        console.log(res);
        setReviewReports(res.data);
        return res;
    };

    const handleReviewReportUpdate = () => {
        setReviewReports(null);
        fetchReviewReports();
    };

    const handleDeleteReview = () => {

    };

    const displayReviewReports = (ReviewReports, filter) => {
        if (!ReviewReports) return null;
        const {
            pendingFilter,
            approvedFilter
        } = filter;
        const statusFilterMap = {
            "PENDING": filter.pendingFilter,
            "APPROVED": filter.approvedFilter
        };
        return ReviewReports.map((reviewReport) => 
            statusFilterMap[reviewReport.status] ? (
                <ReviewReportBox key={reviewReport._id} data={reviewReport} onReviewReportUpdate={handleReviewReportUpdate}/>
            ) : null
        );
    };

    useEffect(() => {
        fetchReviewReports();
    }, []);

    useEffect(() => {
        if (reviewReports) {

        }
    }, [reviewReports]);
    
    const [pendingFilter, setPendingFilter] = useState(true);
    const [approvedFilter, setApprovedFilter] = useState(true);
    
    let filter = {
        pendingFilter,
        approvedFilter
    };

    const statusButtonsData = [
        {text: "PENDING", state: pendingFilter, setState: setPendingFilter, colorOn: "bg-blue-500", colorOff: "bg-gray-400"},
        {text: "APPROVED", state: approvedFilter, setState: setApprovedFilter, colorOn: "bg-blue-500", colorOff: "bg-gray-400"}
    ];

    return (
        <>
            <div className="flex h-20 items-center pl-14 text-[24px] font-[700] text-black">
                Review Report Management
            </div>
            <div className="w-[680px] mx-15 border-t border-1 border-black"></div>
            <div className="flex mx-15 p-2 h-24 gap-4">
                {statusButtonsData.map((button) => (
                    <StatusButton
                        key={button.text}
                        text={button.text}
                        colorOn={button.colorOn}
                        colorOff={button.colorOff}
                        state={button.state}
                        setState={button.setState}
                    />
                ))}
            </div>
            <div className="flex flex-col h-105 mx-15 gap-4 pt-2 px-2 flex-shrink-0 overflow-y-scroll scrollbar">
                {displayReviewReports(reviewReports, filter)}
            </div>
        </>
    );
}

export default ReviewReport;
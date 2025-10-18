export const ReturnStatusDisplay = ({ latestStatusKey }) => {
    let statusText = "N/A";
    let statusClasses = "text-gray-500 bg-gray-200"; 

    if (latestStatusKey.includes("REFUNDED")) {
        statusText = "คืนเงินสำเร็จ (Refunded)";
        statusClasses = "text-green-700 bg-green-200";
    } else if (latestStatusKey.includes("RETURN_SHIPPED")) {
        statusText = "ส่งคืนแล้ว (Return Shipped)";
        statusClasses = "text-purple-700 bg-purple-200";
    } else if (latestStatusKey.includes("APPROVED")) {
        statusText = "อนุมัติแล้ว (Approved)";
        statusClasses = "text-blue-700 bg-blue-200";
    } else if (latestStatusKey.includes("REJECTED")) {
        statusText = "คำขอถูกปฏิเสธ (Rejected)";
        statusClasses = "text-red-700 bg-red-200";
    } else if (latestStatusKey.includes("DISPUTED")) {
        statusText = "รอดำเนินการ (Disputed)";
        statusClasses = "text-orange-700 bg-orange-200";
    }
    return (
        <span 
            className={`text-xs font-bold uppercase tracking-wider px-2 py-1 rounded-full ${statusClasses}`}
        >
            {statusText}
        </span>
    );
};
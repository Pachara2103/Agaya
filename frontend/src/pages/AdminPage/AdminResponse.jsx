import {useState} from "react";
import { updateReviewReportStatus } from "../../services/reviewReportService";

export function AdminResponse({reviewReportId, onProcessComplete, user}) {
    const [responseMessage, setResponseMessage] = useState("");
    const [status, setStatus] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!status) {
            setError("Please select either Approve or Reject.");
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            await updateReviewReportStatus(reviewReportId, status, responseMessage, user);
            onProcessComplete();
        } catch(err) {
            setError(err.message || `Failed to process request: ${status}`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col gap-2 min-h-30 bg-[#f8f8f8ff] text-black p-4 pt-0">
            <form onSubmit={handleSubmit} className="grid grid-cols-12 gap-x-4 gap-y-3">
                <span className="col-span-3 flex items-center font-[600] text-black text-[14px] mt-4">
                    Admin Response
                </span>
                <div className="col-span-9 flex items-center gap-3 mt-4">
                    <div
                        className={`
                            flex items-center justify-center h-8 w-24 text-white text-[13px] rounded cursor-pointer transition-opacity duration-200 ease-in-out font-semibold
                            ${status === "APPROVED" 
                                ? "bg-green-500 opacity-100" // Selected: full opacity green
                                : "bg-green-500 opacity-30 hover:opacity-70"} // Unselected: 30% opacity green
                        `}
                        onClick={() => setStatus("APPROVED")}
                    >
                        APPROVED
                    </div>
                    <div
                        className={`
                            flex items-center justify-center h-8 w-24 text-white text-[13px] rounded cursor-pointer transition-opacity duration-200 ease-in-out font-semibold
                            ${status === "REJECTED" 
                                ? "bg-red-500 opacity-100" // Selected: full opacity red
                                : "bg-red-500 opacity-30 hover:opacity-70"} // Unselected: 30% opacity red
                        `}
                        onClick={() => setStatus("REJECTED")}
                    >
                        REJECTED
                    </div>
                </div>
                <label htmlFor="responseMessage" className="col-span-3 flex items-center font-[600] text-black text-[14px]">
                    response message:
                </label>
                <input
                    id="responseMessage"
                    type="text"
                    value={responseMessage}
                    onChange={(e) => setResponseMessage(e.target.value)}
                    className="col-span-9 border border-gray-300 p-1 text-black bg-gray-100 focus:ring-[#48B3AF] focus:border-[#48B3AF] focus:outline-none rounded"
                    placeholder="Enter admin response . . ."
                    required
                />

                {error && <div className="col-span-full text-red-500 text-sm">{error}</div>}

                <button
                    type="submit"
                    disabled={isLoading || !status || responseMessage.length === 0}
                    className={`
                        col-start-9 col-span-4 h-10 w-24 text-white font-[600] rounded transition-colors duration-200 ease-in-out justify-self-end
                        ${isLoading || !status || responseMessage.length === 0 
                            ? "bg-gray-400 cursor-not-allowed" 
                            : "bg-[#48B3AF] hover:bg-[#3a9391] cursor-pointer"
                        }
                    `}
                >
                    {isLoading ? "Sending..." : "Confirm"}
                </button>
            </form>
        </div>
    );
};
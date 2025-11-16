import React, { useState } from "react";
import { createReviewReport } from "../../services/reviewReportService.js";
import AlertSnackbar from "../../components/Common/AlertSnackbar.jsx";

// A small helper component to create the custom radio button
const CustomRadio = ({ label, value, checked, onChange, name }) => {
  const isChecked = checked === value;

  return (
    <label
      className="flex items-center text-gray-700 cursor-pointer text-lg"
      onClick={() => onChange({ target: { value, name } })}
    >
      <input
        type="radio"
        name={name}
        value={value}
        checked={isChecked}
        onChange={onChange}
        className="hidden" // Hide the default radio button
      />
      {/* This is the custom-styled radio button */}
      <span
        className={`w-5 h-5 mr-4 flex items-center justify-center rounded-full border-2 transition-all ${
          isChecked ? "border-green-500" : "border-gray-400"
        }`}
      >
        {isChecked && (
          <span className="w-3 h-3 bg-green-500 rounded-full"></span>
        )}
      </span>
      {label}
    </label>
  );
};

export const ReviewReport = ({ reviewId }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [reportCategory, setReportCategory] = useState("");
  const [otherReason, setOtherReason] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null); // This is the IN-MODAL error

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const reportOptions = [
    { value: "misinformation", label: "Misinformation" },
    { value: "spamReview", label: "Spam review" },
    { value: "hatefulReview", label: "Hateful review" },
    { value: "harassmentBullying", label: "Harassment / bullying" },
    { value: "inappropriateReview", label: "Inappropriate review" },
  ];

  const handleReportClick = (e) => {
    e.stopPropagation(); // Prevent any parent onClick events
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setReportCategory("");
    setOtherReason("");
    setError(null);
    setIsLoading(false); // Reset loading state
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const handleCategoryChange = (e) => {
    setReportCategory(e.target.value);
    setError(null);
  };

  const handleOtherReasonChange = (e) => {
    setOtherReason(e.target.value);
    setError(null);
  };

  const handleSubmitReport = async () => {
    // 1. Validation
    if (!reportCategory) {
      setError("Please select a report category.");
      return;
    }
    if (reportCategory === "other" && !otherReason.trim()) {
      setError("Please provide a reason.");
      return;
    }

    // 2. Determine the final reason string
    let finalReason = "";
    if (reportCategory === "other") {
      finalReason = otherReason;
    } else {
      const selectedOption = reportOptions.find(
        (opt) => opt.value === reportCategory
      );
      finalReason = selectedOption ? selectedOption.label : "Other";
    }

    // 3. Prepare data for API
    const reportData = {
      reviewId: reviewId,
      reason: finalReason,
    };

    // 4. Set loading state and clear old errors
    setIsLoading(true);
    setError(null);

    // 5. Call API
    try {
      await createReviewReport(reportData);

      // Success!
      console.log("Report submitted successfully!", reportData);
      setSnackbar({
        open: true,
        message: "Report submitted successfully!",
        severity: "success",
      });

      handleClosePopup(); // Close the modal on success
    } catch (err) {
      // Handle error from API
      console.error("Failed to submit report:", err);
      // This error stays inside the modal
      setError(err.message || "An unexpected error occurred.");
      setSnackbar({
        open: true,
        message: err.message || "An unexpected error occurred.",
        severity: "error",
      });
    } finally {
      // 6. Reset loading state
      setIsLoading(false);
    }
  };

  return (
    <>
      <AlertSnackbar
        open={snackbar.open}
        onClose={handleSnackbarClose}
        message={snackbar.message}
        severity={snackbar.severity}
      />

      {/* This is the trigger button. */}
      <button
        onClick={handleReportClick}
        className="text-xs font-medium text-gray-500 hover:text-red-600 hover:underline"
        title="Report this review"
      >
        Report
      </button>

      {/* This is the modal popup */}
      {showPopup && (
        <div
          // Modal Backdrop
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          onClick={handleClosePopup} // Close modal when clicking backdrop
        >
          <div
            // Modal Panel
            className="w-full max-w-lg p-10 bg-white rounded-3xl shadow-xl flex flex-col"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
          >
            {/* Title Section */}
            <div className="pb-5 border-b border-gray-200">
              <h3 className="text-3xl font-bold text-gray-900 text-left">
                Report Review
              </h3>
            </div>

            <h4 className="mt-8 mb-6 text-xl text-gray-800 text-left">
              Select report Category
            </h4>

            {/* Radio Button Group */}
            <div className="space-y-4">
              {reportOptions.map((opt) => (
                <CustomRadio
                  key={opt.value}
                  label={opt.label}
                  value={opt.value}
                  checked={reportCategory}
                  onChange={handleCategoryChange}
                  name="reportCategory"
                />
              ))}

              {/* "Other" Option */}
              <div className="flex items-center text-lg">
                <CustomRadio
                  label="Other"
                  value="other"
                  checked={reportCategory}
                  onChange={handleCategoryChange}
                  name="reportCategory"
                />
                {reportCategory === "other" && (
                  <input
                    type="text"
                    value={otherReason}
                    onChange={handleOtherReasonChange}
                    placeholder="Please specify"
                    className="ml-2 flex-1 px-3 py-1.5 text-black bg-gray-100 border-gray-200 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                )}
              </div>
            </div>

            {/* Show Error Message IN MODAL */}
            {error && (
              <div className="mt-4 text-center text-red-600 font-medium">
                {error}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-center gap-4 mt-10 pt-6">
              <button
                onClick={handleSubmitReport}
                // Teal "Report Review" button
                className="px-10 py-3 text-base font-semibold text-white bg-teal-500 rounded-lg hover:bg-teal-600 transition disabled:bg-gray-400"
                disabled={isLoading}
              >
                {isLoading ? "Submitting..." : "Report Review"}
              </button>
              <button
                onClick={handleClosePopup}
                // Red "Cancel" button
                className="px-10 py-3 text-base font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700 transition"
                disabled={isLoading}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ReviewReport;

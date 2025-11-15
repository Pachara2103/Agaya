import React from "react";

export const AdminConfirmModal = ({isOpen, onClose, onConfirm, status}) => {
    if (!isOpen) return null;

    const isApproving = status === "APPROVED";

    const title = `Are you sure you want to ${isApproving ? "Approve" : "Reject"} this?`;
    const confirmText = isApproving ? "Approve" : "Reject";
    const confirmColor = isApproving
        ? "bg-teal-500 hover:bg-teal-600"
        : "bg-teal-600 hover:bg-red-700";
    
    return (
        <div className="fixed inset-0 bg-black/40 bg-opacity-70 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
                <h2 className="text-xl font-bold mb-4 text-black">{title}</h2>
                <p className="mb-6 text-gray-700">This action can not be undo.</p>
                <div className="flex justify-end gap-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400 font-semibold"
                    >
                        Cancle
                    </button>
                    <button
                        onClick={onConfirm}
                        className={`px-4 py-2 text-white rounded-md font-semibold ${confirmColor}`}
                    >
                        {confirmText}
                    </button>
                </div>
            </div>

        </div>
    );
};
// In components/ReturnTrackingIdForm.js

import React, { useState } from 'react';

export const ReturnTrackingIdForm = ({ orderId, onSubmitTrackingId }) => {
    const [trackingId, setTrackingId] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!trackingId.trim()) {
            alert("กรุณาใส่หมายเลขพัสดุ (Please enter the tracking ID).");
            return;
        }

        setIsSubmitting(true);
        try {
            await onSubmitTrackingId(orderId, trackingId);
            setTrackingId(''); // Clear input on success
        } catch (error) {
            console.error("Submission failed in component:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="p-4 px-10 border-gray-200 bg-white">
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 items-end">
                <div className="flex-grow w-full">
                    <label htmlFor="trackingId" className="block text-sm font-medium text-gray-700 mb-1">
                        หมายเลขพัสดุคืนสินค้า:
                    </label>
                    <input
                        id="trackingId"
                        type="text"
                        value={trackingId}
                        onChange={(e) => setTrackingId(e.target.value)}
                        placeholder="กรอกหมายเลขพัสดุ (Tracking ID)"
                        className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                        disabled={isSubmitting}
                    />
                </div>
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-4 py-2 bg-[#48B3AF] text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed transition duration-150"
                >
                    {isSubmitting ? 'กำลังส่ง...' : 'ส่งหมายเลขพัสดุ'}
                </button>
            </form>
        </div>
    );
};
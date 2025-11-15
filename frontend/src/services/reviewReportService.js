import { API_URL } from "./api";
import { getAuthHeaders, handleResponse } from "../utils/apiHealper";

export const getReviewReports = async () => {
    try {
        const res = await fetch(`${API_URL}/review-reports`, {
            method: "GET",
            headers: getAuthHeaders(),
        });
        return await handleResponse(res);
    } catch(err) {
        console.error("Error fetching review reports: ", err);
        throw new Error(err.message || "Server Error: Could not fetch review reports.");
    }
};

export const getVendorName = async (vendorId) => {
    try {
        const res = await fetch(`${API_URL}/users/by-vendor/${vendorId}`, {
            method: "GET",
        });
        return await handleResponse(res);
    } catch(err) {
        console.error("Error fetching vendor name: ", err);
        throw new Error(err.message || "Server Error: Could not fetch vendor name.");
    }
};

export const updateReviewReportStatus = async (id, status, response, user) => {
    try {
        const res = await fetch(`${API_URL}/review-reports/${id}`, {
            method: "PUT",
            headers: getAuthHeaders(),
            body: JSON.stringify({id, status, response, user})
        });
        return await handleResponse(res);
    } catch(err) {
        console.error("Error processing review report: ", err);
        throw new Error(err.message || "Server Error: Could not process review report.");
    }
};

//delete, reply
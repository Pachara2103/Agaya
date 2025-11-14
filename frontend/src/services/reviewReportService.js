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

//delete, reply
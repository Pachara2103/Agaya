import { API_URL } from "./api";
import { getAuthHeaders, handleResponse } from "../utils/apiHealper";

// @desc      Customer sends a return request
// @route     POST /api/v1/Agaya/return/request
// @access    Private (Customer)
export const requestReturnService = async (orderId, products, reason) => {
    try {
        const res = await fetch(`${API_URL}/return/request`, {
            method: "POST",
            headers: getAuthHeaders(),
            body: JSON.stringify({ orderId, products, reason })
        });
        return await handleResponse(res);
    } catch (err) {
        console.error("Error submitting return request: ", err);
        throw new Error(err.message || "Server Error: Could not submit the return request.");
    }
};

// @desc      Get return requests (Customer: own requests | Admin: all requests)
// @route     GET /api/v1/Agaya/return/?status=...&page=...&limit=...
// @access    Private
export const getReturnRequests = async (status = '', page = 1, limit = 100) => {
    try {
        const params = new URLSearchParams();
        if (status) params.append('status', status);
        params.append('page', Math.max(1, parseInt(page)).toString());
        params.append('limit', Math.max(1, parseInt(limit)).toString());

        const url = `${API_URL}/return/?${params.toString()}`;

        const res = await fetch(url, {
            method: "GET",
            headers: getAuthHeaders()
        });
        return await handleResponse(res);
    } catch (err) {
        console.error("Error fetching return requests: ", err);
        throw new Error(err.message || "Server Error: Could not fetch return requests.");
    }
};

// @desc      Get return requests for a specific vendor
// @route     GET /api/v1/Agaya/return/vendor?status=...&page=...&limit=...
// @access    Private (Admin, Vendor)
export const getVendorReturnRequests = async (status = '', page = 1, limit = 10) => {
    try {
        const params = new URLSearchParams();
        if (status) params.append('status', status);
        params.append('page', Math.max(1, parseInt(page)).toString());
        params.append('limit', Math.max(1, parseInt(limit)).toString());

        const url = `${API_URL}/return/vendor?${params.toString()}`;

        const res = await fetch(url, {
            method: "GET",
            headers: getAuthHeaders()
        });
        return await handleResponse(res);
    } catch (err) {
        console.error("Error fetching vendor return requests: ", err);
        throw new Error(err.message || "Server Error: Could not fetch vendor return requests.");
    }
};

// @desc      Process a return request (Admin/Vendor: APPROVED, REJECTED, COMPLETED)
// @route     PUT /api/v1/Agaya/return/:id/process
// @access    Private (Admin, Vendor)
export const processReturnService = async (returnId, status, response) => {
    try {
        const res = await fetch(`${API_URL}/return/${returnId}/process`, {
            method: "PUT",
            headers: getAuthHeaders(),
            body: JSON.stringify({ status, response })
        });
        return await handleResponse(res);
    } catch (err) {
        console.error(`Error processing return request ${returnId}: `, err);
        throw new Error(err.message || "Server Error: Could not process the return request.");
    }
};

// @desc      Customer submits tracking ID for an APPROVED return
// @route     PUT /api/v1/Agaya/return/tracking/:orderId
// @access    Private (Customer)
export const submitReturnTrackingIdService = async (orderId, trackingId) => {
    try {
        const res = await fetch(`${API_URL}/return/tracking/${orderId}`, {
            method: "PUT",
            headers: getAuthHeaders(),
            body: JSON.stringify({ trackingId })
        });
        return await handleResponse(res);
    } catch (err) {
        console.error(`Error submitting tracking ID for order ${orderId}: `, err);
        throw new Error(err.message || "Server Error: Could not submit the tracking ID.");
    }
};

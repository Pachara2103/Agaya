import { API_URL } from "./api";
import { getAuthHeaders, handleResponse } from "../utils/apiHealper";

// @desc      Create a new support ticket
// @route     POST /api/v1/Agaya/support-ticket/
// @access    Private (Customer)
export const createSupportTicket = async (subject, description, priority = 0) => {
    try {
        const res = await fetch(`${API_URL}/support-ticket/`, {
            method: "POST",
            headers: getAuthHeaders(),
            body: JSON.stringify({
                subject,
                description,
                priority
            })
        });
        return await handleResponse(res);
    } catch (err) {
        console.error("Error creating ticket: ", err);
        throw new Error(err.message || "Server Error: Could not submit the support ticket.");
    }
};

// @desc      Update ticket status and/or add admin response
// @route     PUT /api/v1/Agaya/support-ticket/:ticketId
// @access    Private (Admin only)
export const updateSupportTicket = async (ticketId, status, response) => {
    try {
        const res = await fetch(`${API_URL}/support-ticket/${ticketId}`, {
            method: "PUT",
            headers: getAuthHeaders(),
            body: JSON.stringify({
                status,
                response
            })
        });
        return await handleResponse(res);
    } catch (err) {
        console.error("Error updating ticket: ", err);
        throw new Error(err.message || "Server Error: Could not update the ticket.");
    }
};

// @desc      Get all support tickets (Admin) or user's tickets (Customer)
// @route     GET /api/v1/Agaya/support-ticket/?status=...&page=...&limit=...
// @access    Private
export const getSupportTickets = async (status = '', page = 1, limit = 10) => {
    try {
        const params = new URLSearchParams();
        if (status) params.append('status', status);
        params.append('page', Math.max(1, parseInt(page)).toString());
        params.append('limit', Math.max(1, parseInt(limit)).toString());

        const url = `${API_URL}/support-ticket/?${params.toString()}`;

        const res = await fetch(url, {
            method: "GET",
            headers: getAuthHeaders()
        });

        return await handleResponse(res);
    } catch (err) {
        console.error("Error fetching tickets: ", err);
        throw new Error(err.message || "Server Error: Could not fetch support tickets.");
    }
};

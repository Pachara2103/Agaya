
import { API_URL } from "./api";
import { getMe } from "./authService";
import { getAuthHeaders, handleResponse } from "../utils/apiHealper";
import { getVendorId } from "./userService";

export const isOwnerOfProduct = async (productVendorId) => {
  try {
    const userResponse = await getMe();
    const user = userResponse.data;

    if (!user || !user.userType.includes("vendor")) {
      return false;
    }

    const vendorIdResponse = await getVendorId(user._id);
    const loggedInVendorId = vendorIdResponse;
    
    return loggedInVendorId === productVendorId;

  } catch (err) {
    console.error("Error checking product ownership:", err);
    return false;
  }
};

export const createReviewReport = async (reportData) => {
  try {
    const response = await fetch(`${API_URL}/review-reports`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(reportData),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to create review report");
    }
    return await response.json();
  } catch (err) {
    console.error("Error: ", err);
    throw err;
  }
};

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



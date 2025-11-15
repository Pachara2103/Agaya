import { API_URL } from "./api";
import Cookies from "js-cookie";
import { getMe } from "./authService";

const getAuthHeaders = () => {
  const token = Cookies.get("token");
  if (!token) {
    return { "Content-Type": "application/json" };
  }
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

export const isOwnerOfProduct = async (vendorId) => {
  try {
    const userResponse = await getMe();
    const user = userResponse.data;
    //console.log("Logged in user:", user);
    //console.log(user.userType.includes("vendor") && user._id === vendorId);
    //return true;
    return user.userType.includes("vendor") && user._id === vendorId;
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

export const getAllReviewReports = async (filters) => {};

export const getReviewReportById = async (reportId) => {};

export const deleteReviewReport = async (reportId) => {};

export const updateReviewReportStatus = async (reportId, status) => {};

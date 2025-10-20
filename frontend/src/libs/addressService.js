// src/libs/addressService.js

import { API_URL } from "./api";
import { getAuthHeaders } from "./authService";

/**
 * Fetches the first address for a given user ID.
 * @param {string} userId - The ID of the user whose address is to be fetched.
 * @returns {Promise<object|null>} A promise that resolves to the first address object or null if not found.
 * @throws {Error} Throws an error if the fetch operation fails.
 */
export const getAddressByUserId = async (userId) => {
  try {
    const headers = getAuthHeaders();
    if (!headers.Authorization) {
      throw new Error("Authentication token is missing.");
    }

    const url = `${API_URL}/address/${userId}/addresses`; // Corresponds to GET /:id/addresses

    const response = await fetch(url, {
      method: "GET",
      headers: headers,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch address");
    }

    // The backend returns an array of addresses. We'll return the first one.
    return data.length > 0 ? data[0] : null;
  } catch (err) {
    console.error("Failed to fetch user address:", err);
    throw new Error(
      err.message || "Could not get the address from the server."
    );
  }
};

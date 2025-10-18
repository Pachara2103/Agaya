import Cookies from "js-cookie";

// utility function that return headers
export const getAuthHeaders = () => {
  const token = Cookies.get('token');
  if (!token) {
    // If no token, return default Content-Type header
    return { "Content-Type": "application/json" };
  }
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

//  handle fetch respon
export const handleResponse = async (res) => {
    if (!res.ok) {
        // Attempt to parse JSON body for specific error message
        const errorBody = await res.json();
        throw new Error(errorBody.message || `HTTP error! Status: ${res.status}`);
    }
    return res.json();
};

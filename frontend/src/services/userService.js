import { API_URL } from "./api";

const findByEmail = async (email) => {
  try {
    const res = await fetch(`${API_URL}/users/email/${email}`);
    const data = await res.json();
    return data;
  } catch (err) {
    throw new Error("Can not get users");
  }
};

const sendOTP = async (email) => {
  try {
    const res = await fetch(`${API_URL}/otp/send-email-otp`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email,
      }),
    });

    const data = await res.json();
    return data;
  } catch (err) {
    throw new Error("Can not get users");
  }
};

const verifyOTP = async (email, otp) => {
  try {
    const res = await fetch(`${API_URL}/otp/verify-otp`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email,
        otp,
      }),
    });

    const data = await res.json();
    return data;
  } catch (err) {
    throw new Error("Can not get users");
  }
};

const setnewPassword = async (email, newPassword) => {
  try {
    const res = await fetch(`${API_URL}/auth/forgot-password`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email,
        newPassword,
      }),
    });

    const data = await res.json();
    return data;
  } catch (err) {
    throw new Error("Can not get users");
  }
};

const getMe = async () => {
  try {
    const res = await fetch(`${API_URL}/auth/me`);
    const data = await res.json();

    return data;
  } catch (err) {
    throw new Error("Can not get users");
  }
};

const getVendorId = async (userId) => {
  try {
    const res = await fetch(`${API_URL}/users/vendor/${userId}`);
    const data = await res.json();
    console.log("Vendor ID response data:", data);

    return data.data;
  } catch (err) {
    throw new Error("Can not get users");
  }
};

export { findByEmail, sendOTP, verifyOTP, setnewPassword, getMe, getVendorId  };

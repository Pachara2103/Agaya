import { API_URL } from "./api";

const findByEmail = async (email) => {
  try {
    const res = await fetch(`${API_URL}/users/email/${email}`);
    return res.json();
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
    return res.json();
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
        email, otp
      }),
    });
    return res.json();
  } catch (err) {
    throw new Error("Can not get users");
  }
};

export { findByEmail, sendOTP, verifyOTP };

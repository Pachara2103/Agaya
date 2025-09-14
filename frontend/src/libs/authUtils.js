import { API_URL } from "./api";

const Login = async (email, password) => {
  try {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const data = await res.json();
    return data;
  } catch (err) {
    throw new Error("Can not get users");
  }
};

const userLogin = async (url, user) => {
  try {
    const res = await fetch(`${url}/auth`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        ...user,
      }),
    });
    const loginResult = await res.json();
    return loginResult;
  } catch (e) {
    throw new Error("can not login");
  }
};

export { userLogin, Login };

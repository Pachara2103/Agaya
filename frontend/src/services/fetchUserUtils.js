import {API_URL} from './api';

const getUsers = async () => {
  try {
    const data = await fetch(`${API_URL}/api/v1/Agaya/users`);
    const users = data.json();
    return users;
  } catch (err) {
    throw new Error("Can not get users");
  }
};

const getUser = async (userId) => {
  try {
    const data = await fetch(`${API_URL}/users/${userId}`);
    const users = data.json();
    return users;
  } catch (err) {
    throw new Error("Can not get user");
  }
};

const createUser = async (newUser) => {
  console.log("Create User Called")
  try {
    console.log(JSON.stringify(newUser))
    const res = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        ...newUser,
      }),
    });
    const createdUser = await res.json();
    return createdUser;
  } catch (e) {
    console.log(e);
    throw new Error("Can not create user");
  }
};

const updateUser = async (url, id, updateUser) => {
  try {
    console.log(`${url}/users/${id}`);
    const res = await fetch(`${url}/users/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        ...updateUser,
      }),
    });
    const updatedUser = await res.json();
    return updatedUser;
  } catch (e) {
    throw new Error("Can not update user");
  }
};

const deleteUser = async (url, id) => {
  try {
    const res = await fetch(`${url}/users/${id}`, {
      method: "DELETE"
    });
    return res.status;
  } catch (e) {
    throw new Error("Can not delete user");
  }
};

export { getUsers, getUser, createUser, updateUser, deleteUser }
const getUser = async (url) => {
  try {
    const data = await fetch(`${url}/users`);
    const users = data.json();
    return users;
  } catch (err) {
    throw new Error("Can not get users");
  }
}

const createUser = async (url, newUser) => {
  try {
    console.log(JSON.stringify(newUser))
    const res = await fetch(`${url}/users`, {
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
}
export { getUser, createUser, updateUser, deleteUser }
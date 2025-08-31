import { useState, useEffect } from "react";
import { API_URL } from "../libs/api";
import { getUser, createUser, updateUser, deleteUser } from "../libs/fetchUserUtils";

function TestUserFetch() {

    let users;

    useEffect(() => {
    const fetchUsers = async () => {
      // users = await getUser(API_URL);
      // console.log(users);
      // console.log(await updateUser(API_URL, "68ad16333b6e594e92e48e04", {username: "test1"}));
      // console.log(await deleteUser(API_URL, "68ad16333b6e594e92e48e04"));
      // console.log(
      //   await createUser(API_URL, {
      //     username: "test1",
      //     password: "test1",
      //     phoneNumber: "1111111111",
      //     email: "test1@gmail.com",
      //     userType: "admin",
      //     address: "abc",
      //   })
      // );
    };

    fetchUsers();
  }, []);

  return (
    <>
      {users}
    </>
  );
}

export default TestUserFetch;
import { useState, useEffect } from "react";
import { API_URL } from "../libs/api";
import { getUser, createUser, updateUser, deleteUser } from "../libs/fetchUserUtils";
import { getProducts, createProduct } from "../libs/productService";

function TestFetch() {

    let testObj;
    let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4YzZlY2E3M2QyZjg5ZjAxZmM1ZDJkNSIsImlhdCI6MTc1Nzg2NzE3NiwiZXhwIjoxNzYwNDU5MTc2fQ.Z-f7iKzRZuwYnVdZ8osKauFpUHYzYAKyxXKTpZuMSh0";

    useEffect(() => {
    const fetchTest = async () => {
      testObj = await getProducts(API_URL, token);
      console.log(testObj);
      // users = await getUser(API_URL);
      // console.log(await updateUser(API_URL, "68ad16333b6e594e92e48e04", {username: "test1"}));
      // console.log(await deleteUser(API_URL, "68ad16333b6e594e92e48e04"));
      console.log(
        await createProduct(API_URL, token, 
          {
          product_name: "asadsadasd",
          stock_quantity: 69,
          price: 69,
          rating: 4.5,
          vid:"asdsad",
          type: "",
          product_description:"asdasd"
        })
      );
    };

    fetchTest();
  }, []);

  return (
    <>
      {testObj}
    </>
  );
}

export default TestFetch;
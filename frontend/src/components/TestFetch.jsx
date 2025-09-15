import { useState, useEffect } from "react";
import { API_URL } from "../libs/api";
import { getUser, createUser, updateUser, deleteUser } from "../libs/fetchUserUtils";
import { getProducts, createProduct, getProductsById, updateProduct, deleteProduct } from "../libs/productService";

function TestFetch() {

    let testObj;
    let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4YzZlY2E3M2QyZjg5ZjAxZmM1ZDJkNSIsImlhdCI6MTc1Nzg2NzE3NiwiZXhwIjoxNzYwNDU5MTc2fQ.Z-f7iKzRZuwYnVdZ8osKauFpUHYzYAKyxXKTpZuMSh0";

    useEffect(() => {
    const fetchTest = async () => {
      console.log(await getProducts(API_URL, token));
      console.log(await getProductsById(API_URL, token, "68c6f90a42c4d92f49b2b6e2"));
      console.log(await deleteProduct(API_URL, token, "68c6f94175ca2fa3c962f9b9"));
      // console.log(
      //   await createProduct(API_URL, token, 
      //     {
      //     product_name: "asadsadasd",
      //     stock_quantity: 69,
      //     price: 69,
      //     rating: 4.5,
      //     vid:"asdsad",
      //     type: "",
      //     product_description:"asdasd"
      //   })
      // );
      // console.log(
      //   await updateProduct(API_URL, token, "68c6f94175ca2fa3c962f9b9", 
      //     {
      //     product_name: "frontend2",
      //   })
      // );

    };

    fetchTest();
  }, []);

  return (
    <>
      {/* {testObj} */}
    </>
  );
}

export default TestFetch;
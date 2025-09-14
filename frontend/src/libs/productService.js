const getProducts = async (url, token) => {
  try {
    const data = await fetch(`${url}/products`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
      }
    });
    const products = data.json();
    return products;
  } catch (err) {
    throw new Error("Can not get products");
  }
}
const createProduct = async (url, token, newProduct ) => {
  console.log("Create Product Called")
  try {
    console.log(JSON.stringify(newProduct))
    const res = await fetch(`${url}/products`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({
        ...newProduct,
      }),
    });
    const createdProduct = await res.json();
    return createdProduct;
  } catch (e) {
    console.log(e);
    throw new Error("Can not create product");
  }
};
const deleteProduct = async (url, id) => {
  try {
    const res = await fetch(`${url}/Product/${id}`, {
      method: "DELETE"
    });
    return res.status;
  } catch (e) {
    throw new Error("Can not delete product");
  }
}

export { getProducts, createProduct }
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
const getProductsById = async (url, token, id) => {
  try {
    const data = await fetch(`${url}/products/${id}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
      }
    });
    const product = data.json();
    return product;
  } catch (err) {
    throw new Error("Can not get product");
  }
}

const createProduct = async (url, token, newProduct ) => {
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

const updateProduct = async (url, token, id, data) => {
  try {
    console.log(JSON.stringify(data))
    const res = await fetch(`${url}/products/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({
        ...data,
      }),
    });
    const updatedProduct = await res.json();
    return updatedProduct;
  } catch (e) {
    console.log(e);
    throw new Error("Can not update product");
  }
};
const deleteProduct = async (url, token, id) => {
  try {
    const res = await fetch(`${url}/products/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`,
      }
    });
    return res.status;
  } catch (e) {
    throw new Error("Can not delete product");
  }
}

export { getProducts, createProduct, getProductsById, updateProduct, deleteProduct }

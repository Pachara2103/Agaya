const Product = require("../models/product");

// @desc   Get all products
// @route  GET /api/v1/Agaya/products
// @access Public
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({success:true, products});
    if (!product) return res.status(404).json({ message: "Product not found" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// @desc   Get single product by ID
// @route  GET /api/v1/Agaya/products/:id
// @access Public
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json({success:true, product});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// @desc   Create new product
// @route  POST /api/v1/Agaya/products
// @access Public
const createProduct = async (req, res) => {
  try {
    const product = req.body;
    const new_product = await Product.create(product);
    res.status(201).json(new_product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
};
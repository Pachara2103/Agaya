<<<<<<< HEAD
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
||||||| 8833a62
=======
const productService = require('../services/product-service');

exports.findAllProduct = async (req, res, next) => {
    try {
        const products = await productService.findAllProduct();
        res.status(200).json({ success: true, count: products.length, data: products });
    } catch (err) {
        next(err);
    }
};

exports.findProductById = async (req, res, next) => {
    try {
        const product = await productService.findProductById(req.params.id);
        res.status(200).json({ success: true, data: product });
    } catch (err) {
        next(err);
    }
};

exports.createProduct = async (req, res, next) => {
    try {
        const newProduct = await productService.createProduct(req.body, req.user);
        res.status(201).json({ success: true, data: newProduct });
    } catch (err) {
        next(err);
    }
};

exports.updateProduct = async (req, res, next) => {
    try {
        const updatedProduct = await productService.updateProduct(req.params.id, req.body, req.user);
        res.status(200).json({ success: true, data: updatedProduct });
    } catch (err) {
        next(err);
    }
};

exports.deleteProduct = async (req, res, next) => {
    try {
        await productService.deleteProduct(req.params.id, req.user);
        res.status(200).json({ success: true, message: "Product deleted successfully" });
    } catch (err) {
        next(err);
    }
};
>>>>>>> 4fa6c6ae5a9c1c679bf58b642b15670b8e915504

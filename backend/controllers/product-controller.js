const Product = require('../models/product');
const createError = require('http-errors');

// Get all products
const findAllProduct = async (req, res) => {
    try {
        const products = await Product.find();
        return res.status(200).json(products);
    }
    catch (err) {
        res.status(400).json({ msg: err.message });
    }
}

// Get product by ID
const findProductById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const product = await Product.findById(id);

        if (!product){
            return next(createError(404, "Product not found"));
        } 
        
        return res.status(200).json(product);
    } catch (err) {
        res.status(400).json({ msg: err.message });
    }
}

// Create a new product
const createProduct = async (req, res, next) => {
    try {
        const { product_id, product_name, stock_quantity, price, rating, vid, type } = req.body;

        const newProduct = await Product.create({
            product_id,
            product_name,
            stock_quantity,
            price,
            rating,
            vid,
            type
        });
        return res.status(201).json(newProduct);
    } catch (err) {
        res.status(400).json({ msg: err.message });
    }
}

// Update an existing product
const updateProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const { product_id, product_name, stock_quantity, price, rating, vid, type } = req.body;
        let isUpdated = false;

        const product = await Product.findById(id);
        if (!product) return res.status(400).json({ message: "Product not found" });
        const updatedData = {};

        if (product_id && product.product_id !== product_id) {
            updatedData.product_id = product_id;
            isUpdated = true;
        }
        if (product_name && product.product_name !== product_name) {
            updatedData.product_name = product_name;
            isUpdated = true;
        }   
        if (stock_quantity && product.stock_quantity !== stock_quantity) {
            updatedData.stock_quantity = stock_quantity;
            isUpdated = true;
        }
        if (price && product.price !== price) {
            updatedData.price = price;
            isUpdated = true;
        }
        if (rating && product.rating !== rating) {
            updatedData.rating = rating;
            isUpdated = true;
        }
        if (vid && product.vid !== vid) {
            updatedData.vid = vid;
            isUpdated = true;
        }
        if (type && product.type !== type) {
            updatedData.type = type;
            isUpdated = true;
        }

        if (!isUpdated) return res.status(400).json({ msg: "Does not have any different data" });
        const updatedProduct = await Product.findByIdAndUpdate(id, updatedData, { new: true });

        return res.status(200).json(updatedProduct);
    } catch (err) {
        res.status(400).json({ msg: err.message });
    }
}

// Delete a product
const deleteProduct = async (req, res, next) => {
    try {
        const id = req.params.id;
        const product = await Product.findById(id);
        if (!product) return next(createError(404, "Product not found"));
        await Product.findByIdAndDelete(id);
        return res.status(200).json({ message: "Product deleted successfully" });
    } catch (err) {
        res.status(400).json({ msg: err.message });
    }
}

//CRUD operations
module.exports = { findAllProduct, findProductById, createProduct, updateProduct, deleteProduct }; 
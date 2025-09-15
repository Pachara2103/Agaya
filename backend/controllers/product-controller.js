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

exports.findProductsByVendor = async (req, res, next) => {
    try {
        const products = await productService.findProductsByVendorId(req.user._id);
        res.status(200).json({ success: true, count: products.length, data: products });
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
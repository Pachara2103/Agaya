const Product = require('../models/product');
const createError = require('http-errors');
const auditService = require('./audit-service');

// Get all products
exports.findAllProduct = async () => {
    const products = await Product.find();
    return products;
}

// Get product by ID
exports.findProductById = async (id) => {
        const product = await Product.findById(id);
        if (!product){
            throw createError(404, "Product not found");
        } 
        return product;
}

// Create a new product
exports.createProduct = async (createData, user) => {
    try {
        const { product_id, product_name, stock_quantity, price, rating, vid, type } = createData;
        const newProduct = await Product.create({
            product_id,
            product_name,
            stock_quantity,
            price,
            rating,
            vid,
            type
        });

        if (user) {
            await auditService.logAction({
                user: user._id,
                action: 'create',
                resource: 'Product',
                resourceId: newProduct._id,
                changes: createData
            });
        }

        return newProduct;
    } catch (err) {

        if (err.code === 11000) {
            throw createError(400, `Product with ID '${createData.product_id}' already exists`);
        }

        if (err.name === 'ValidationError') {
            const messages = Object.values(err.errors).map(val => val.message);
            throw createError(400, messages.join(', '));
        }

        throw err;
    }
}

// Update an existing product
exports.updateProduct = async (id, updateData, user) => {
    const { product_id, product_name, stock_quantity, price, rating, vid, type } = updateData;
    let isUpdated = false;

    const product = await Product.findById(id);
    if (!product) {
        throw createError(404, "Product not found");
    }   

    const updatedData = {};
    if (product_id && product.product_id !== product_id) { 
        updatedData.product_id = product_id; isUpdated = true; 
    }
    if (product_name && product.product_name !== product_name) { 
        updatedData.product_name = product_name; isUpdated = true; 
    }
    if (stock_quantity && product.stock_quantity !== stock_quantity) { 
        updatedData.stock_quantity = stock_quantity; isUpdated = true; 
    }
    if (price && product.price !== price) { 
        updatedData.price = price; isUpdated = true; 
    }
    if (rating && product.rating !== rating) { 
        updatedData.rating = rating; isUpdated = true; 
    }
    if (vid && product.vid !== vid) { 
        updatedData.vid = vid; isUpdated = true; 
    }
    if (type && product.type !== type) { 
        updatedData.type = type; isUpdated = true; 
    }

    if (!isUpdated) {
        throw createError(400, "Does not have any different data.");
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, updatedData, { new: true });

    if (user) {
        await auditService.logAction({
            user: user._id,
            action: 'update',
            resource: 'Product',
            resourceId: updatedProduct._id,
            changes: updatedData
        });
    }

    return updatedProduct;
}

// Delete a product
exports.deleteProduct = async (id, user) => {
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
        throw createError(404, "Product not found");
    }

    if (user) {
        await auditService.logAction({
            user: user._id,
            action: 'delete',
            resource: 'Product',
            resourceId: product._id,
            changes: null
        });
    }

    return;
}
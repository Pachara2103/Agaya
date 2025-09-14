const Product = require('../models/product');
const AuditLog = require('../models/audit-log');
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
        
    if (product) {
        return product;
    }

    const deleteLog = await AuditLog.findOne({ resource: 'Product', resourceId: id, action: 'delete' }).sort({ timestamp: -1 });
    
    if (deleteLog) {
        const deletedAt = deleteLog.timestamp.toISOString();
        throw createError(410, `Product was deleted at ${deletedAt}`);
    }

    throw createError(404, 'Product not found');
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
exports.updateProduct = async (product, updateData, user) => {
    try {
        
        let isUpdated = false;
        const fields = ["product_id", "product_name", "stock_quantity", "price", "rating", "type"];
        const dataToUpdate = {};

        for (const key of fields) {
            if (updateData[key] !== undefined && product[key] !== updateData[key]) {
                dataToUpdate[key] = updateData[key];
                isUpdated = true;
            }
        }

        if (!isUpdated) throw createError(400, "Does not have any different data.");

        Object.assign(product, dataToUpdate);
        const updated = await product.save();

        // Audit log
        if (user) {
            await auditService.logAction({
                user: user._id,
                action: "update",
                resource: "Product",
                resourceId: updated._id,
                changes: dataToUpdate
            });
        }

        return updated;
        
    } catch (err) {
        if (err.code === 11000) {
            throw createError(400, `Product with ID '${updateData.product_id}' already exists`);
        }   

        if (err.name === 'ValidationError') {
            const messages = Object.values(err.errors).map(val => val.message);
            throw createError(400, messages.join(', '));
        }
        throw err;
    }
}

// Delete a product
exports.deleteProduct = async (product, user) => {

    await product.deleteOne();

    if (user) {
        await auditService.logAction({
            user: user._id,
            action: "delete",
            resource: "Product",
            resourceId: product._id,
            changes: null
        });
    }

    return;
}
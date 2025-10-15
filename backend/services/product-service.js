const Product = require('../models/product');
const AuditLog = require('../models/audit-log');
const createError = require('http-errors');
const auditService = require('./audit-service');
const Vendor = require('../models/vendor')


// Get all products
exports.findAllProduct = async (queryParams) => {
    const { keyword, category, page = 1, limit = 12 } = queryParams;

    let query = {};

    if (keyword) {
        query.productName = { $regex: keyword, $options: 'i' };
    }

    if (category) {
        query.type = category;
    }

    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);
    const skip = (pageNumber - 1) * limitNumber;

    const products = await Product.find(query)
        .limit(limitNumber)
        .skip(skip)
        .sort({ createdAt: -1 }); 

    const productsWithPromoPrize = products.map((product) => {
        const obj = product.toObject();
        obj.finalPrice = product.getFinalPrice();
        return obj;
    });

    console.log('keyword = ', keyword)

    const totalProducts = await Product.countDocuments(query);
    const totalPages = Math.ceil(totalProducts / limitNumber);

    return {
        products: productsWithPromoPrize,
        currentPage: pageNumber,
        totalPages: totalPages,
        totalProducts: totalProducts
    };
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

exports.findProductsByVendorId = async (userId) => {
    const vendor = await Vendor.findOne({ userId: userId})
    if (!vendor) {
        throw createError(404, `You are not vendor brother`);
    }
    const products = await Product.find({ vendorId: vendor._id });
    return products
}

exports.createProduct = async (createData, user) => {
    try {
        const { productName, stockQuantity, price, rating, type, productDescription, image, promotion} = createData;

        const vendor = await Vendor.findOne({ userId: user._id })

        if (!vendor) {
            throw createError(404, `You are not vendor brother`);
        }
        
        const newProduct = await Product.create({
            productName,
            stockQuantity,
            price,
            rating,
            type,
            productDescription,
            image,
            vendorId: vendor._id,
            promotion
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
            throw createError(400, `Product with the same unique field already exists`);
        }
        if (err.name === 'ValidationError') {
            const messages = Object.values(err.errors).map(val => val.message);
            throw createError(400, messages.join(', '));
        }
        throw err;
    }
}

exports.updateProduct = async (id, updateData, user) => {
    try {
        const product = await Product.findById(id);
        if (!product) {
            throw createError(404, "Product not found");
        }

        // Move here
        const isAdmin = user.userType.includes('admin');
        const isOwner = product.vendorId.toString() === user._id.toString();

        if (!isAdmin && !isOwner) {
            throw createError(403, "You do not have permission to modify this product.");
        }

        let isUpdated = false;
        const fields = ["productName", "stockQuantity", "price", "rating", "type", "productDescription", "image", "promotion"];
        const dataToUpdate = {};

        for (const key of fields) {
            if (updateData.hasOwnProperty(key) && product[key] !== updateData[key]) {
                dataToUpdate[key] = updateData[key];
                isUpdated = true;
            }
        }

        if (!isUpdated) {
            throw createError(400, "Does not have any different data to update.");
        }

        Object.assign(product, dataToUpdate);
        const updatedProduct = await product.save();

        // Audit log
        if (user) {
            await auditService.logAction({
                user: user._id,
                action: "update",
                resource: "Product",
                resourceId: updatedProduct._id,
                changes: dataToUpdate
            });
        }

        return updatedProduct;

    } catch (err) {
        if (err.name === 'ValidationError') {
            const messages = Object.values(err.errors).map(val => val.message);
            throw createError(400, messages.join(', '));
        }
        throw err; 
    }
}

exports.deleteProduct = async (id, user) => {
    const product = await Product.findById(id);
    if (!product) {
        throw createError(404, "Product not found");
    }
    // Check permmission here
    const isAdmin = user.userType.includes('admin');
    const isOwner = product.vendorId.toString() === user._id.toString();

    if (!isAdmin && !isOwner) {
        throw createError(403, "You do not have permission to delete this product.");
    }

    await product.deleteOne();

    if (user) {
        await auditService.logAction({
            user: user._id,
            action: "delete",
            resource: "Product",
            resourceId: product._id,
            changes: product.toObject() 
        });
    }

    return;
}
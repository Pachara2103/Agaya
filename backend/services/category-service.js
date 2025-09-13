const Category = require('../models/category');

// Create Category
exports.createCategory = async (data) => {
    const category = new Category(data);
    return await category.save();
};

// Get All Categories
exports.getAllCategories = async () => {
    return await Category.find();
};

// Get Category by ID
exports.getCategoryById = async (id) => {
    return await Category.findById(id);
};

// Update Category
exports.updateCategory = async (id, data) => {
    return await Category.findByIdAndUpdate(id, data, { new: true });
};

// Delete Category
exports.deleteCategory = async (id) => {
    return await Category.findByIdAndDelete(id);
};

const Category = require('../models/category');
const createError = require('http-errors'); 

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
    const category = await Category.findById(id); 
    if (!category) {
        throw createError(404, 'Category not found');
    }
    return category;
};

// Update Category
exports.updateCategory = async (id, data) => {
    const updatedCategory = await Category.findByIdAndUpdate(id, data, { new: true });
    if (!updatedCategory) {
        throw createError(404, 'Category not found');
    }
    return updatedCategory;
};

// Delete Category
exports.deleteCategory = async (id) => {
    const deletedCategory = await Category.findByIdAndDelete(id);
    if (!deletedCategory) {
        throw createError(404, "Category not found");
    }
    return deletedCategory;
};


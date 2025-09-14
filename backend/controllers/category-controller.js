const categoryService = require('../services/category-service');

// Create
exports.createCategory = async (req, res, next) => {
    try {
        const category = await categoryService.createCategory(req.body);
        res.status(201).json({ success: true, data: category });
    } catch (error) {
        next(error);
    }
};

// Get All
exports.getAllCategories = async (req, res, next) => {
    try {
        const categories = await categoryService.getAllCategories();
        res.status(200).json({ success: true, data: categories });
    } catch (error) {
        next(error);
    }
};

// Get by ID
exports.getCategoryById = async (req, res, next) => {
    try {
        const category = await categoryService.getCategoryById(req.params.id);
        res.status(200).json({ success: true, data: category });
    } catch (error) {
        next(error);
    }
};

// Update
exports.updateCategory = async (req, res, next) => {
    try {
        const updated = await categoryService.updateCategory(req.params.id, req.body);
        res.status(200).json({ success: true, data: updated });
    } catch (error) {
        next(error);
    }
};

// Delete
exports.deleteCategory = async (req, res, next) => {
    try {
        const deleted = await categoryService.deleteCategory(req.params.id);
        res.status(200).json({ success: true, message: 'Category deleted successfully', data: deleted });
    } catch (error) {
        next(error);
    }
};

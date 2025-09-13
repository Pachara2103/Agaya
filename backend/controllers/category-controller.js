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
        res.json({ success: true, data: categories });
    } catch (error) {
        next(error);
    }
};

// Get by ID
exports.getCategoryById = async (req, res, next) => {
    try {
        const category = await categoryService.getCategoryById(req.params.id);
        if (!category) {
            const err = new Error('Category not found');
            err.statusCode = 404;
            return next(err);
        }
        res.json({ success: true, data: category });
    } catch (error) {
        next(error);
    }
};

// Update
exports.updateCategory = async (req, res, next) => {
    try {
        const updated = await categoryService.updateCategory(req.params.id, req.body);
        if (!updated) {
            const err = new Error('Category not found');
            err.statusCode = 404;
            return next(err);
        }
        res.json({ success: true, data: updated });
    } catch (error) {
        next(error);
    }
};

// Delete
exports.deleteCategory = async (req, res, next) => {
    try {
        const deleted = await categoryService.deleteCategory(req.params.id);
        if (!deleted) {
            const err = new Error('Category not found');
            err.statusCode = 404;
            return next(err);
        }
        res.json({ success: true, message: 'Category deleted successfully' });
    } catch (error) {
        next(error);
    }
};

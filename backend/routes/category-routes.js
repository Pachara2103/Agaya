const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category-controller');

// POST /api/categories
router.post('/', categoryController.createCategory);

// GET /api/categories
router.get('/', categoryController.getAllCategories);

// GET /api/categories/:id
router.get('/:id', categoryController.getCategoryById);

// PUT /api/categories/:id
router.put('/:id', categoryController.updateCategory);

// DELETE /api/categories/:id
router.delete('/:id', categoryController.deleteCategory);

module.exports = router;

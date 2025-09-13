const express = require('express');
const router = express.Router();
const { createCategory, getAllCategories, getCategoryById, updateCategory, deleteCategory } = require('../controllers/category-controller');

// POST /api/categories
router.post('/', createCategory);

// GET /api/categories
router.get('/', getAllCategories);

// GET /api/categories/:id
router.get('/:id', getCategoryById);

// PUT /api/categories/:id
router.put('/:id', updateCategory);

// DELETE /api/categories/:id
router.delete('/:id', deleteCategory);

module.exports = router;

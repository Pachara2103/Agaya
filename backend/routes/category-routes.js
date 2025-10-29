const express = require('express');
const router = express.Router();
const { createCategory, getAllCategories, getCategoryById, updateCategory, deleteCategory, getCategoryQuantity } = require('../controllers/category-controller');

// POST /api/category
router.post('/', createCategory);

// GET /api/category
router.get('/', getAllCategories);

// GET /api/category/:id
router.get('/:id', getCategoryById);

// GET /api/category/:type
router.get('/count/:type', getCategoryQuantity );

// PUT /api/category/:id
router.put('/:id', updateCategory);

// DELETE /api/category/:id
router.delete('/:id', deleteCategory);

module.exports = router;

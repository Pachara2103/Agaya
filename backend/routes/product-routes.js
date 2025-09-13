const express = require("express");
const router = express.Router();

const {
  findAllProduct,
  findProductById,
    createProduct,
    updateProduct,
    deleteProduct
} = require("../controllers/product-controller");

const { protect, authorize } = require("../middleware/auth");
const checkOwnership = require("../middleware/checkOwnerShip");

const Product = require("../models/product");

router.get("/", protect, findAllProduct);
router.get("/:id", protect, findProductById);
router.post("/", protect, authorize("vendor", "admin"), createProduct);
router.put("/:id", protect, authorize("vendor", "admin"), checkOwnership(Product, "vid", "Product"), updateProduct);
router.delete("/:id", protect, authorize("vendor", "admin"), checkOwnership(Product, "vid", "Product"), deleteProduct);

module.exports = router;
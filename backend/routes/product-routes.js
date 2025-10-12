const express = require("express");
const router = express.Router();

const {
  findAllProduct,
  findProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  findProductsByVendor
} = require("../controllers/product-controller");

const { protect, authorize } = require("../middleware/auth");
// const checkOwnership = require("../middleware/checkOwnerShip");

const Product = require("../models/product");

router.get("/vendor/my-products", protect, authorize("vendor", "admin"), findProductsByVendor);

router.get("/", findAllProduct);
router.get("/:id", findProductById);
router.post("/", protect, authorize("vendor", "admin"), createProduct);
router.put("/:id", protect, authorize("vendor", "admin"), updateProduct);
router.delete("/:id", protect, authorize("vendor", "admin"), deleteProduct);

module.exports = router;

<<<<<<< HEAD
const express = require("express");
const router = express.Router();
const {
  getProducts,
  getProductById,
  createProduct,
} = require("../controllers/product-controller");

router.get("/", getProducts);
router.get("/:id", getProductById);
router.post("/", createProduct);

module.exports = router;
||||||| 8833a62
=======
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
// const checkOwnership = require("../middleware/checkOwnerShip");

const Product = require("../models/product");

router.get("/", protect, findAllProduct);
router.get("/:id", protect, findProductById);
router.post("/", protect, authorize("vendor", "admin"), createProduct);
router.put("/:id", protect, authorize("vendor", "admin"), updateProduct);
router.delete("/:id", protect, authorize("vendor", "admin"), deleteProduct);

module.exports = router;
>>>>>>> 4fa6c6ae5a9c1c679bf58b642b15670b8e915504

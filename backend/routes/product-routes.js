const express = require("express");
const router = express.Router();

const { findAllProduct, findProductById, createProduct, updateProduct, deleteProduct } = require("../controllers/product-controller");

router.route("/").get(findAllProduct);
router.route("/:id").get(findProductById);
router.route("/").post(createProduct);
router.route("/:id").put(updateProduct).delete(deleteProduct);

module.exports = router;
const express = require("express");
const router = express.Router();
const {
  addCart,
  getCart,
  getCarts,
  deleteCart,
} = require("../controllers/cart-controller");

router.route("/").get(getCarts).post(addCart);
router.route("/:id").get(getCart).delete(deleteCart);

module.exports = router;

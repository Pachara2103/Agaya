const express = require("express");
const router = express.Router();
const {
  addAddress,
  getAddressesByUser,
  updateAddress,
  deleteAddress
} = require("../controllers/address-controller");

router.route("/:id/addresses").get(getAddressesByUser).post(addAddress);
router.route("/addresses/:id").put(updateAddress).delete(deleteAddress);

module.exports = router;
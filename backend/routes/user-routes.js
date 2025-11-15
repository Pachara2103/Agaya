const express = require("express");
const router = express.Router();
const {
  findAll,
  findById,
  findByVendorId,
  findByEmail,
  update,
  deleteUser,
  getVendorId
} = require("../controllers/user-controller");

router.route("/").get(findAll);
router.route("/:id").get(findById).put(update).delete(deleteUser);
router.route("/email/:email").get(findByEmail);
router.route("/by-vendor/:id").get(findByVendorId);
router.route("/vendor/:userId").get(getVendorId);

module.exports = router;
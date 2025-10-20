const express = require("express");
const router = express.Router();
const {
  findAll,
  findById,
  findByEmail,
  update,
  deleteUser,
  getVendorId,
} = require("../controllers/user-controller");

router.route("/").get(findAll);
router.route("/:id").get(findById).put(update).delete(deleteUser);
router.route("/email/:email").get(findByEmail);

//get vendor id from user id
router.route("/vendor/:userId").get(getVendorId);

module.exports = router;

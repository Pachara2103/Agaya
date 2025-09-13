const express = require("express");
const router = express.Router();
const {
  findAll,
  create,
  update,
  deleteUser,
} = require("../controllers/user-controller");

router.route("/").get(findAll);
router.route("/:id").get(findById).put(update).delete(deleteUser);

module.exports = router;
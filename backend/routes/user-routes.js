const express = require("express");
const router = express.Router();
const {
  findAll,
  create,
  update,
  deleteUser,
} = require("../controllers/user-controller");

router.route("/").get(findAll);
router.route("/").post(create);
router.route("/:id").post(update).delete(deleteUser);

module.exports = router;

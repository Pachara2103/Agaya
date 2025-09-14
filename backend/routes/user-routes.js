const express = require("express");
const router = express.Router();
const {
  findAll,
  findById,
  findByEmail,
  update,
  deleteUser,
} = require("../controllers/user-controller");

router.route("/").get(findAll);
router.route("/:id").get(findById).put(update).delete(deleteUser);
router.route("/email/:email").get(findByEmail);


module.exports = router;
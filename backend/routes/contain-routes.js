const express = require("express");
const router = express.Router();
const {
  addContain,
  getContainsByCartId,
  updateContain,
  deleteContain
} = require("../controllers/contain-controller");

router.route("/").post(addContain);
router.route("/:id").get(getContainsByCartId).put(updateContain).delete(deleteContain);

module.exports = router;
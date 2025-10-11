const express = require("express");
const router = express.Router();
const {
  addAddTo,
  getAddToesByCartId,
  updateAddTo,
  deleteAddTo
} = require("../controllers/addto-controller");

router.route("/").post(addAddTo);
router.route("/:id").get(getAddToesByCartId).put(updateAddTo).delete(deleteAddTo);

module.exports = router;
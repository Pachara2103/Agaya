const express = require("express");
const router = express.Router();
const {
  addAddTo,
  getAddToesByUser,
  updateAddTo,
  deleteAddTo
} = require("../controllers/addto-controller");

router.route("/").post(addAddTo);
router.route("/:id").get(getAddToesByUser).put(updateAddTo).delete(deleteAddTo);

module.exports = router;
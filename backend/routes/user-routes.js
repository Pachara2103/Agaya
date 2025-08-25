const express = require("express");
const router = express.Router();
const { create, findAll } = require("../controllers/user-controller");

router.route("/").get(findAll);
router.route("/").post(create);

module.exports = router;
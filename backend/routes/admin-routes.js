const express = require("express");
const router = express.Router();
const { listSuspendedUsers, updateUserRole, banUser } = require("../controllers/admin-controller");
const { protect, authorize } = require("../middleware/auth");

router.get("/admin/users/suspended", protect, authorize("admin"), listSuspendedUsers);
router.put("/admin/users/:id/role", protect, authorize("admin"), updateUserRole);
router.put("/admin/users/:id/ban", protect, authorize("admin"), banUser);

module.exports = router;

const express = require("express");
const router = express.Router();
const { 
  getPendingApplications,
  approveApplication,
  rejectApplication,
  updateUserRole, 
  banUser,
  getTotalOrdersCount,
  getTotalVendorsCount
} = require("../controllers/admin-controller");
const { protect, authorize } = require("../middleware/auth");

router.use(protect, authorize("admin"));

router.get("/vendor-applications", getPendingApplications);
router.put("/vendor-applications/:id/approve", approveApplication);
router.put("/vendor-applications/:id/reject", rejectApplication);

router.put("/users/:id/role", updateUserRole);
router.put("/users/:id/ban", banUser);

router.get("/orders/count", getTotalOrdersCount);
router.get("/vendors/count", getTotalVendorsCount);

module.exports = router;
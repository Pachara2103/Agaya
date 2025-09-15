const adminService = require('../services/admin-service');

exports.getPendingApplications = async (req, res, next) => {
  try {
    const applications = await adminService.getPendingApplications();
    res.status(200).json({ success: true, count: applications.length, data: applications });
  } catch (error) {
    next(error);
  }
};

exports.approveApplication = async (req, res, next) => {
  try {
    const result = await adminService.processApplication(req.params.id, 'approved');
    res.status(200).json({ success: true, message: 'Application approved successfully', data: result });
  } catch (error) {
    next(error);
  }
};

exports.rejectApplication = async (req, res, next) => {
  try {
    const { rejectionReason } = req.body;
    const result = await adminService.processApplication(req.params.id, 'rejected', rejectionReason);
    res.status(200).json({ success: true, message: 'Application rejected successfully', data: result });
  } catch (error) {
    next(error);
  }
};

exports.updateUserRole = async (req, res, next) => {
  try {
    const updatedUser = await adminService.updateUserRole(req.params.id, req.body.roles);
    res.status(200).json({ success: true, data: updatedUser });
  } catch (err) {
    next(err);
  }
};

exports.banUser = async (req, res, next) => {
  try {
    const updatedUser = await adminService.banUser(req.params.id);
    res.status(200).json({ success: true, data: updatedUser });
  } catch (err) {
    next(err);
  }
};
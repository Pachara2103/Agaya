const User = require('../models/user');
const VendorApplication = require('../models/vendor-application');
const createError = require('http-errors');

exports.getPendingApplications = async () => {
  const applications = await VendorApplication.find({ status: 'pending' })
    .populate('userId', "username email");
  return applications;
};

exports.processApplication = async (applicationId, newStatus, reason = null) => {
  const application = await VendorApplication.findById(applicationId);

  if (!application) {
    throw createError(404, 'Application not found');
  }

  if (application.status !== 'pending') {
    throw createError(400, `Application is already ${application.status}`);
  }

  application.status = newStatus;
  if (newStatus === 'rejected') {
    application.rejectionReason = reason;
  }
  
  await application.save();

  if (newStatus === 'approved') {
    await User.findByIdAndUpdate(application.user, {
      $addToSet: { userType: 'vendor' }
    });
  }

  return application;
};

exports.updateUserRole = async (id, roles) => {
  if (!Array.isArray(roles)) {
    throw createError(400, "Roles must be an array.");
  }
  const user = await User.findById(id);
  if (!user) {
    throw createError(404, "User not found");
  }

  user.userType = roles; 
  await user.save();
  return user;
};

exports.banUser = async (id) => {
  const user = await User.findById(id);
  if (!user) {
    throw createError(404, "User not found");
  }

  // if (user.userType.includes('admin')) {
  //   throw createError(403, "Cannot ban an admin user.");
  // }

  user.status = 'banned'; 
  await user.save();
  return user;
};
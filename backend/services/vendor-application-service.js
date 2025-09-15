const VendorApplication = require('../models/vendor-application'); 
const createError = require('http-errors');

exports.createApplication = async (userId, applicationData) => {
  const existingApplication = await VendorApplication.findOne({ user: userId });
  if (existingApplication) {
    throw createError(400, 'You have already submitted an application.');
  }

  const { storeName, sampleProducts, address } = applicationData;

  const application = await VendorApplication.create({
    user: userId,
    storeName,
    sampleProducts,
    address,
  });

  return application;
};

exports.getApplicationByUserId = async (userId) => {
  const application = await VendorApplication.findOne({ user: userId });
  if (!application) {
    throw createError(404, 'No application found for this user');
  }
  return application;
};
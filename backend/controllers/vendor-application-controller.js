const vendorAppService = require('../services/vendor-application-service');

exports.createApplication = async (req, res, next) => {
  try {
    const application = await vendorAppService.createApplication(req.user.id, req.body);
    res.status(201).json({ success: true, data: application });
  } catch (error) {
    next(error); 
  }
};

exports.getMyApplicationStatus = async (req, res, next) => {
  try {
    const application = await vendorAppService.getApplicationByUserId(req.user.id);
    res.status(200).json({ success: true, data: application });
  } catch (error) {
    next(error); 
  }
};
const {requestReturn, processReturn, getReturnReqsService, getReturnReqsByVendorService, submitReturnTrackingIdService} = require("../services/return-request-service");

// PATH : POST /api/v1/agaya/return/request
/*
  req.body : {
    "orderId" : "68ef7b7da2562cfe70121dc2",
    "products" : [{
        "productId": "68ef6e4ff9e853a33bedb193",
        "quantity" : "4"
    }],
    "reason" : "Wrong product"
  }
*/ 
exports.requestReturn = async (req, res, next) => {
    try {
        const returnRequest = await requestReturn(req.body, req.user);
        res.status(201).json({success : true, data : returnRequest});
    } catch (error) {
        next(error);
    }
};
// PATH : PUT /api/v1/agaya/return/:returnId/process
exports.processReturn = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await processReturn(id, req.body, req.user);
    res.status(200).json({success: true, data : result});
  } catch (error) {
    next(error);
  }
};

exports.getReturnReqs = async (req, res, next) => {
  try {
    const returnReqs = await getReturnReqsService(req.user, req.query);
    res.status(200).json({success: true, data : returnReqs});
  } catch (error) {
    next(error);
  }
}
exports.getReturnReqsByVendor = async (req, res, next) => {
  try {
    const returnReqs = await getReturnReqsByVendorService(req.user, req.query);
    res.status(200).json({success: true, data : returnReqs});
  } catch (error) {
    next(error);
  }
}

exports.submitReturnTrackingId = async (req, res, next) => {
  try {
    const updatedReturnReq = await submitReturnTrackingIdService(req.params, req.body, req.user);
      res.status(200).json({
        success: true,
        message: "Tracking ID submitted successfully.",
        data: updatedReturnReq,
      });
  } catch (error) {
    next(error); 
  }
};


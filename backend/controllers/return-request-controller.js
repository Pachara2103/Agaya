const {requestReturn, processReturn, getReturnReqs} = require("../services/return-request-service");

// PATH : POST /api/v1/agaya/return/request
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
    const returnReqs = await getReturnReqs(req.user, req.query);
    res.status(200).json({success: true, data : returnReqs});
  } catch (error) {
    next(error);
  }
}
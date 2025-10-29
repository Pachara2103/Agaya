const { getTransactionByOrderId } = require("../services/transaction-service");

exports.getTransactionByOrderId = async (req, res, next) => {
  try {
    const transaction = await getTransactionByOrderId(req.params.orderId);
    res.status(200).json({ success: true, data: transaction });
  } catch (err) {
    next(err);
  }
};
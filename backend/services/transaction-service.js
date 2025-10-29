const Transaction = require("../models/transaction");
const createError = require('http-errors');

exports.getTransactionByOrderId = async (orderId) => {
  try {
    const transaction = await Transaction.findOne({ orderId: orderId });
    if (!transaction) {
      throw new createError(404, "Transaction not found for this order");
    }
    return transaction;
  } catch (err) {
    throw err;
  }
};
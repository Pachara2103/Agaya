const Contain = require("../models/contain");
const createError = require("http-errors");

exports.addContain = async (data) => {
  const { productId, orderId, quantity } = data;

  const result = await Contain.create({
    productId,
    orderId,
    quantity,
  });
  return result;
};
exports.getContainByOrderId = async(orderId) => {
    const result = await Contain.find({orderId: orderId});
    return result;
};
exports.updateContain = async (id, updatedData) => {
    const { productId, orderId, quantity } = updatedData;
    const updatedContain = await Contain.findByIdAndUpdate(
        id,
        { productId, orderId, quantity },
        {new: true, runValidators: true}
    );
    if (!updatedContain) {
        throw createError(404, "Contain not found.");
    }
    return updatedContain;
};
exports.deleteContain = async (id) => {
    const deletedContain = await Contain.findByIdAndDelete(id);
    if (!deletedContain) {
        throw createError(404, "Contain not found.");
    }
    return;
};
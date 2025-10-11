const AddTo = require("../models/addto");
const createError = require("http-errors");

exports.addAddTo = async (Data) => {
  const { pid, cart_id, quantity } = Data;

  const result = await AddTo.create({
    pid,
    cart_id,
    quantity,
  });
  return result;
};
exports.getAddToByUser = async(cartId) => {
    const result = await Addto.find({cart_id: cartId});
    return result;
};
exports.updateAddTo = async (id, updatedData) => {
    const { pid, cart_id, quantity } = updatedData;
    const updatedAddTo = await AddTo.findByIdAndUpdate(
        id,
        { pid, cart_id, quantity },
        {new: true, runValidators: true}
    );
    if (!updatedAddTo) {
        throw createError(404, "AddTo not found.");
    }
    return updatedAddTo;
};
exports.deleteAddTo = async (id) => {
    const deletedAddTo = await AddTo.findByIdAndDelete(id);
    if (!deletedAddTo) {
        throw createError(404, "AddTo not found.");
    }
    return;
};
const Cart = require("../models/cart");
const createError = require("http-errors");
exports.addCart = async (data) => {
  const { customerId } = data;

  const result = await Cart.create({
    customerId,
  });
  return result;
};
exports.findAllCarts = async () => {
  const result = await Cart.find();
  return result;
};

exports.findByUserId = async (userId) => {
  const result = await Cart.find({ customerId: userId });
  if (result.length === 0) {
    const newCart = await Cart.create({
      customerId: userId,
    });
    return newCart;
  }
  return result;
};

exports.deleteCart = async (id) => {
  const deletedCart = await Cart.findByIdAndDelete(id);
  if (!deletedCart) {
    throw createError(404, "Cart not found.");
  }
  return;
};

const Cart = require("../models/cart");
const createError = require("http-errors");
exports.addCart = async (data) => {
  const { uid } = data;

  const result = await Cart.create({
    uid,
  });
  return result;
};
exports.findAllCarts = async () => {
  const result = await Cart.find();
  return result;
};

exports.findByUserId = async (userId) => {
  const result = await Cart.find({ uid: userId });
  if (!result || result.length === 0) {
    const newCart = await Cart.create({
      uid: userId,
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

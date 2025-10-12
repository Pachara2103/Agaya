const addto = require("../models/addto");
const AddTo = require("../models/addto");
const createError = require("http-errors");

exports.addAddTo = async (Data) => {
    const { productId, cartId, quantity } = Data;

    const existingAddTo = await AddTo.findOne({
        productId: productId,
        cartId: cartId, 
    });

    let result;

    if (existingAddTo) {
        const newQuantity = existingAddTo.quantity + quantity;

        result = await AddTo.findByIdAndUpdate(
            existingAddTo._id,
            { quantity: newQuantity },
            { new: true, runValidators: true}
        )
    } else {
        result = await AddTo.create({
            productId,
            cartId,
            quantity
        })
    }
    
    return result;
};
exports.getAddToByCartId = async(cartId) => {
    const result = await AddTo.find({cartId: cartId}).populate("productId", "productName productDescription price image");
    return result;
};
exports.updateAddTo = async (id, updatedData) => {
    const { productId, cartId, quantity } = updatedData;
    const updatedAddTo = await AddTo.findByIdAndUpdate(
        id,
        { productId, cartId, quantity },
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
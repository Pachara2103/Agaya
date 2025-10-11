const cartService = require("../services/cart-service");

exports.addCart = async (req, res, next) => {
    try {
      console.log(req.body);
        const newCart = await cartService.addCart(req.body);
        res.status(201).json({success: true, data: newCart});
    } catch (err) {
        next(err);
    }
};
exports.getCart = async (req, res, next) => {
    try {
      console.log(req.params.id);
        const cart = await cartService.findByUserId(req.params.id);
        res.status(200).json(cart);
    } catch (err) {
        next(err);
    }
};
exports.getCarts = async (req, res, next) => {
    try {
        const carts = await cartService.findAllCarts();
        res.status(200).json(carts);
    } catch (err) {
        next(err);
    }
};


exports.deleteCart = async (req, res, next) => {
    try {
        await cartService.deleteCart(req.params.id);
        res.status(200).json({message: "Cart deleted successfully"});
    } catch (err) {
        next(err);
    }
};
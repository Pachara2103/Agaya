const addressService = require("../services/address-service");

// Address managements
exports.addAddress = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const newAddress = await addressService.addAddress(userId, req.body);
        res.status(201).json({success: true, data: newAddress.toObject()});
    } catch (err) {
        next(err);
    }
};

exports.getAddressesByUser = async (req, res) => {
    try {
        const addresses = await addressService.getAddressesByUser(req.params.id);
        res.status(200).json(addresses);
    } catch (err) {
        next(err);
    }
};

exports.updateAddress = async (req, res) => {
    try {
        const updatedAddress = await addressService.updateAddress(req.params.id, req.body);
        res.status(200).json(updatedAddress);
    } catch (err) {
        next(err);
    }
};

exports.deleteAddress = async (req, res) => {
    try {
        await addressService.deleteAddress(req.params.id);
        res.status(200).json({message: "Address deleted successfully"});
    } catch (err) {
        next(err);
    }
};
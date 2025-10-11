const Address = require("../models/address");

// Address managements
exports.addAddress = async (id, updatedData) => {
    const {name, phoneNumber, address} = updatedData;

    const existingAddress = await Address.findOne({
        user: id,
        name: name,
        phoneNumber: phoneNumber,
        address: address
    });

    if (existingAddress) {
        const error = new Error("มีที่อยู่นี้ในระบบแล้ว");
        error.statusCode = 400; //400 Bad Request
        throw error;
    }

    const newAddress = await Address.create({
        user: id,
        name,
        phoneNumber,
        address
    });
    return newAddress;
};

exports.getAddressesByUser = async(userId) => {
    const addresses = await Address.find({user: userId});
    return addresses;
};

exports.updateAddress = async (id, updatedData) => {
    const {name, phoneNumber, address} = updatedData;
    const updatedAddress = await Address.findByIdAndUpdate(
        id,
        {name, phoneNumber, address},
        {new: true, runValidators: true}
    );
    if (!updatedAddress) {
        return res.status(404).json({message: "Address not found"});
    }
    return updatedAddress;
};

exports.deleteAddress = async (id) => {
    const deletedAddress = await Address.findByIdAndDelete(id);
    if (!deletedAddress) {
        return res.status(404).json({message: "Address not found"});
    }
    return;
};
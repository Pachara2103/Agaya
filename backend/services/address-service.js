const Address = require("../models/address");

// Address managements
exports.addAddress = async (id, updatedData) => {
    const {name, phoneNumber, address} = updatedData;
    const userId = id;

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
const User = require("../models/user");
const createError = require("http-errors");

exports.findAll = async () => {
    const users = await User.find();
    return users;
};

exports.findById = async (id) => {
    const user = await User.findById(id);
    if (!user) {
        throw createError(404, "User not found");
    }
    return user;
};

exports.update = async (id, updateData) => {
    const { username, password, phoneNumber, email, userType, dateOfBirth } = updateData;

    const user = await User.findById(id);
    if (!user) {
        throw createError(404, "User not found");
    }

    const dataToUpdate = {};
    let isUpdated = false;

    if (username && user.username !== username) { 
        dataToUpdate.username = username; isUpdated = true; 
    }
    if (password && user.password !== password) { 
        dataToUpdate.password = password; isUpdated = true; 
    }
    if (phoneNumber && user.phoneNumber !== phoneNumber) { 
        dataToUpdate.phoneNumber = phoneNumber; isUpdated = true; 
    }
    if (email && user.email !== email) { 
        dataToUpdate.email = email; isUpdated = true; 
    }
    if (userType && user.userType !== userType) { 
        dataToUpdate.userType = userType; isUpdated = true; 
    }
    if (dateOfBirth && user.dateOfBirth !== dateOfBirth) { 
        dataToUpdate.dateOfBirth = dateOfBirth; isUpdated = true; 
    }

    if (!isUpdated) {
        throw createError(400, "Does not have any different data.");
    }

    const updatedUser = await User.findByIdAndUpdate(id, dataToUpdate, { new: true });
    return updatedUser;
};

exports.deleteUser = async (id) => {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
        throw createError(404, "User not found");
    }
    return;
};
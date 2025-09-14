const User = require("../models/user");
const createError = require("http-errors");
const bcrypt = require('bcryptjs');

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

exports.findByEmail = async (email) => {
    const user = await User.find({email:email});
    if (!user) {
        throw createError(404, "User not found");
    }
    return user;
};

exports.update = async (id, updateData) => {
    const user = await User.findById(id);
    if (!user) throw createError(404, "User not found");

    const tmp = ["username", "password", "phoneNumber", "email", "userType", "dateOfBirth"];
    const dataToUpdate = {};
    let isUpdated = false;

    for (const x of tmp) {
        if (updateData[x]) {
            if (x === "password") {
                const isSame = await bcrypt.compare(updateData.password, user.password);
                if (!isSame) {
                    const salt = await bcrypt.genSalt(10);
                    dataToUpdate.password = await bcrypt.hash(updateData.password, salt);
                    isUpdated = true;
                }
            } else {
                if (user[x] !== updateData[x]) {
                    dataToUpdate[x] = updateData[x];
                    isUpdated = true;
                }
            }
        }
    }

    // send 200
    if (!isUpdated) {
        return user;
    }

    const updatedUser = await User.findByIdAndUpdate(id, dataToUpdate, {
        new: true,
        runValidators: true,
    });

    if (!updatedUser) throw createError(404, "User not found");
    return updatedUser;
};

exports.deleteUser = async (id) => {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
        throw createError(404, "User not found");
    }
    return;
};
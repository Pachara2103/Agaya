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
    const user = await User.findById(id);
    if (!user) throw createError(404, "User not found");

    const tmp = { username, password, phoneNumber, email, userType, dateofBirth}
    const dataToUpdate = {};
    let isUpdated = false;

    for (x in tmp) {
        if (x == password) {
            if (updateData[x] !== undefined) {
                const salt = await bcrypt.genSalt(10);
                dataToUpdate[x] = await bcrypt.hash(updateData[x], salt);
            }
        } else {
            if (updateData[x] !== undefined && user[x] !== updateData[x]) {
                isUpdated = true;
                dataToUpdate[x] = updateData[x];
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
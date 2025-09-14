const User = require("../models/user");
const createError = require("http-errors");

// User management
exports.listSuspendedUsers = async () => {
    const users = await User.find({ status: 'suspended' });
    return users;
}

exports.updateUserRole = async (id, roles) => {
    const user = await User.findById(id);

    if (!user) throw createError(404, "User not found");

    user.userType = roles;
    const updatedUser = await user.save();
    return updatedUser;
}

exports.banUser = async (id) => {
    const user = await User.findById(id);

    if (!user) throw createError(404, "User not found");

    user.status = 'banned';
    const updatedUser = await user.save();
    return updatedUser;
}
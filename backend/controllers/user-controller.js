const userService = require("../services/user-service");

exports.findAll = async (req, res, next) => {
    try {
        const users = await userService.findAll();
        res.status(200).json({ success: true, count: users.length, data: users });
    } catch (err) {
        next(err);
    }
};

exports.findById = async (req, res, next) => {
    try {
        const user = await userService.findById(req.params.id);
        res.status(200).json({ success: true, data: user });
    } catch (err) {
        next(err);
    }
};

exports.update = async (req, res, next) => {
    try {
        const updatedUser = await userService.update(req.params.id, req.body);
        res.status(200).json({ success: true, data: updatedUser });
    } catch (err) {
        next(err);
    }
};

exports.deleteUser = async (req, res, next) => {
    try {
        await userService.deleteUser(req.params.id);
        res.status(200).json({ success: true, message: "User deleted successfully" });
    } catch (err) {
        next(err);
    }
};
const adminService = require('../services/admin-service');

exports.listSuspendedUsers = async (req, res, next) => {
    try {
        const users = await adminService.listSuspendedUsers();
        res.status(200).json({ success: true, count: users.length, data: users });
    } catch (err) {
        next(err);
    }
};

exports.updateUserRole = async (req, res, next) => {
    try {
        const updatedUser = await adminService.updateUserRole(req.params.id, req.body.roles);
        res.status(200).json({ success: true, data: updatedUser });
    } catch (err) {
        next(err);
    }
};

exports.banUser = async (req, res, next) => {
    try {
        const updatedUser = await adminService.banUser(req.params.id);
        res.status(200).json({ success: true, data: updatedUser });
    } catch (err) {
        next(err);
    }
};
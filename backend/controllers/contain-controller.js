const containService = require("../services/contain-service");

exports.addContain = async (req, res, next) => {
    try {
        const newContain = await containService.addContain(req.body);
        res.status(201).json({success: true, data: newContain});
    } catch (err) {
        next(err);
    }
};

exports.getContainsByCartId = async (req, res, next) => {
    try {
        const contains = await containService.getContainByOrderId(req.params.id);
        res.status(200).json(contains);
    } catch (err) {
        next(err);
    }
};

exports.updateContain = async (req, res, next) => {
    try {
        const updatedContain = await containService.updateContain(req.params.id, req.body);
        res.status(200).json(updatedContain);
    } catch (err) {
        next(err);
    }
};

exports.deleteContain = async (req, res, next) => {
    try {
        await containService.deleteContain(req.params.id);
        res.status(200).json({message: "Contain deleted successfully"});
    } catch (err) {
        next(err);
    }
};
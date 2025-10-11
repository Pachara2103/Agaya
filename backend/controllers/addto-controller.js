const addToService = require("../services/addto-service");

exports.addAddTo = async (req, res, next) => {
    try {
        const newAddTo = await addToService.addAddTo(req.body);
        res.status(201).json({success: true, data: newAddTo});
    } catch (err) {
        next(err);
    }
};

exports.getAddToesByCartId = async (req, res, next) => {
    try {
        const addToes = await addToService.getAddToByCartId(req.params.id);
        res.status(200).json(addToes);
    } catch (err) {
        next(err);
    }
};

exports.updateAddTo = async (req, res, next) => {
    try {
        const updatedAddTo = await addToService.updateAddTo(req.params.id, req.body);
        res.status(200).json(updatedAddTo);
    } catch (err) {
        next(err);
    }
};

exports.deleteAddTo = async (req, res, next) => {
    try {
        await addToService.deleteAddTo(req.params.id);
        res.status(200).json({message: "AddTo deleted successfully"});
    } catch (err) {
        next(err);
    }
};
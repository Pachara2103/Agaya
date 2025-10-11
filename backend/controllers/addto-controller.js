const addToService = require("../services/addto-service");

exports.addAddTo = async (req, res, next) => {
    try {
        const newAddTo = await addToService.addAddTo(req.body);
        res.status(201).json({success: true, data: newAddTo});
    } catch (err) {
        next(err);
    }
};

exports.getAddToesByUser = async (req, res) => {
    try {
        const addToes = await addToService.getAddToesByUser(req.params.id);
        res.status(200).json(addToes);
    } catch (err) {
        next(err);
    }
};

exports.updateAddTo = async (req, res) => {
    try {
        const updatedAddTo = await addToService.updateAddTo(req.params.id, req.body);
        res.status(200).json(updatedAddTo);
    } catch (err) {
        next(err);
    }
};

exports.deleteAddTo = async (req, res) => {
    try {
        await addToService.deleteAddTo(req.params.id);
        res.status(200).json({message: "AddTo deleted successfully"});
    } catch (err) {
        next(err);
    }
};
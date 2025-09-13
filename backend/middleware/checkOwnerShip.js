const createError = require('http-errors');

exports.checkOwnership = (model, ownerField, resourceName = "Resource") => {
    return async (req, res, next) => { 
        try {
            const resource = await model.findById(req.params.id);
            if (!resource) {
                return res.status(404).json({ success: false, message: `${resourceName} not found` });
            }

            if (req.user.userType === 'admin') {
                return next(); // Admins have full access
            }

            if (req.user.userType === 'vendor' && resource[ownerField].toString() !== req.user._id.toString()) {
                return res.status(403).json({ success: false, message: `You do not have permission to modify this ${resourceName}` });
            }

            req.resource = resource;

            next();
        } catch (err) {
            next(err);
        }
    };
};
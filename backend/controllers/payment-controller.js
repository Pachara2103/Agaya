const paymentService = require('../services/payment-service');

exports.createCheckoutSession = async (req, res, next) => {
    try {
        const { orderData } = req.body;
        const session = await paymentService.createCheckoutSession(orderData, req.user);
        res.json({ url: session.url });
    } catch (error) {
        next(error);
    }
};

exports.verifyPayment = async (req, res, next) => {
    try {
        const { sessionId } = req.body;
        const result = await paymentService.verifyPayment(sessionId, req.user);
        res.json(result);
    } catch (error) {
        next(error);
    }
};

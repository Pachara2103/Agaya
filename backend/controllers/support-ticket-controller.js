const {createTicket, updateTicket, getTickets} = require("../services/support-ticket-service");

exports.createTicket = async (req, res, next) =>{
    try {
        const {subject, description, priority} = req.body;
        const ticket = await createTicket(subject, description, priority, req.user);
        res.status(201).json({
            success: true,
            data: ticket
        })
    } catch (error) {
        next(error);
    }
}

exports.updateTicket = async (req, res, next) =>{
    try {
        const {ticketId} = req.params;
        const {status, response} = req.body;
        const updateTickets = await updateTicket(ticketId, status, response, req.user);
        res.status(200).json({
            success: true,
            data: updateTickets
        })
    } catch (error) {
        next(error);
    }
}

exports.getTickets = async (req, res, next) =>{
    try {
        const tickets = await getTickets(req.user, req.quary);
        res.status(200).json({
            success: true,
            data: tickets
        })
    } catch (error) {
        next(error);
    }
}
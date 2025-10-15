const { response } = require("../app");
const SupportTicket = require("../models/support-ticket");
const createError = require('http-errors');

const hasRole = (user, roles) =>
    user.userType.some((role) => roles.includes(role));


exports.createTicket = async (subject, description, priority, user) => {
    try {
        const userId = user._id;

        if (!subject || !description) {
            throw new createError(400, "Missing require field");
        }

        if (!priority) priority = 0;

        const ticket = await SupportTicket.create({
            status: "OPEN",
            userId,
            subject,
            ticketDescription: description,
            priority,
            adminResponse: [{
                responseStatus: "OPEN"
            }]
        });
        return ticket;
    } catch (err) {
        throw (err);
    }
}
const statusFlow = {
    OPEN: { next: ["IN_PROGRESS"] },
    IN_PROGRESS: { next: ["RESOLVED"] },
    RESOLVED: { next: ["CLOSED"] },
    CLOSED: { next: [] }
};

//Admin response
exports.updateTicket = async (ticketId, status, adminResponse, user) => {
    try {
        const adminId = user._id;

        const validStatuses = [
            'IN_PROGRESS',
            'RESOLVED',
            'CLOSED'
        ];
        if (!validStatuses.includes(status)) {
            throw new createError(
                400, `Invalid status. Valid values: ${validStatuses.join(", ")}`
            );
        }
        const ticket = await SupportTicket.findById(ticketId);
        if (!ticket) throw new createError(404, "Support ticket not found");

        const prevStatus = ticket.status;
        if (!statusFlow[prevStatus].next.includes(status)) {
            throw new createError(400, `Cannot change status from ${prevStatus} to ${status}`);
        }
        const responseEntry = {
            responseStatus: status,
            adminId
        };
        if (adminResponse) {
            responseEntry.message = adminResponse;
        }
        ticket.status = status;

        ticket.adminResponse.push(responseEntry);
        await ticket.save();
        return ticket;

    } catch (err) {
        throw (err);
    }
}
exports.getTickets = async (user, queryParams = {}) => {
    try {
        let query = {};

        if (!hasRole(user, ["admin"])) {
            query.userId = user._id;
        }
        if (queryParams.status) {
            query.status = queryParams.status.toUpperCase();
        }
        const page = parseInt(queryParams.page) > 0 ? parseInt(queryParams.page) : 1;
        const limit = parseInt(queryParams.limit) > 0 ? parseInt(queryParams.limit) : 10;
        const totalDocument = await SupportTicket.countDocuments(query);
        const totalPages = Math.ceil(totalDocument / limit);
        if (page > totalPages) page = totalPages;
        const skip = (page - 1) * limit;

        const tickets = await SupportTicket.find(query)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        return {
            result: tickets,
            currentPage: page,
            totalPages,
            totalTickets: totalDocument,
        };
    } catch (err) {
        throw err;
    }
};
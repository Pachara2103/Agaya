const ReturnRequest = require("../models/return-request");
const Order = require("../models/order");
const Contain = require("../models/Contain");
const Product = require("../models/product");
const Transaction = require("../models/transaction");
const createError = require("http-errors");

const hasRole = (user, roles) =>
    user.userType.some((role) => roles.includes(role));

exports.requestReturn = async (requestBody, user) => {
    try {
        const { orderId, productId, quantity, reason } = requestBody;
        const customerId = user._id;

        if (!reason) throw new createError(400, "Plese provide reason");

        const order = await Order.findOne({ _id: orderId });
        if (!order) throw new createError(404, "order not found");
        if (order.customerId.toString() !== customerId.toString()) throw new createError(403, "Unauthorized request");

        const contain_product = await Contain.findOne({ orderId, productId });
        if (!contain_product) throw new createError(400, `No product ${productId} in order ${orderId}`);
        if (quantity > contain_product.quantity) {
            throw new createError(400, `Return quantity exceeds purchased amount for product ${productId}`);
        }

        if (!["PAID", "COMPLETE"].includes(order.order_status)) {
            throw new createError(400, "Only PAID or COMPLETE order can be refunded");
        }
        // Order older than 30 day cant be return
        const now = new Date();
        const orderDate = new Date(order.order_date);
        const orderDuration = (now - orderDate) / (24 * 60 * 60 * 1000);
        if (orderDuration > 30) throw new createError(400, "Order older than 30 day cant be return");

        const existRequest = await ReturnRequest.findOne({ orderId, productId, status: { $in: ["PENDING", "APPROVED", "REFUNDED"] } });
        if (existRequest) throw new createError(400, "Return request of this product already exist");

        const returnRequest = new ReturnRequest({
            orderId,
            customerId,
            productId,
            quantity,
            reason,
            status: "PENDING",
            response: "Your request is being reviewed. You will be notified of the outcome within 3-5 business days."
        });

        await returnRequest.save();
        return returnRequest;
    } catch (error) {
        throw error;
    }

}

exports.processReturn = async (returnId, requestBody, user) => {
    try {
        const { status, response } = requestBody;
        const validStatuses = ["APPROVED", "REJECTED", "COMPLETED"];
        if (!validStatuses.includes(status)) {
            throw new createError(
                400, `Invalid status. Valid values: ${validStatuses.join(", ")}`
            );
        }

        const returnReq = await ReturnRequest.findById(returnId);
        if (!returnReq) throw new createError(404, "Request not found");
        const product = await Product.findById(returnReq.productId);


        const now = new Date();
        if (hasRole(user, ["admin"])) {
            if (returnReq.status === "PENDING") {
                if (status === "APPROVED") {
                    returnReq.status = status;
                    returnReq.response = "Plese return the item to the vendor";
                }
                else if (status === "REJECTED") {
                    returnReq.status = status;
                    if (!response) throw new createError(400, "Plese provide reason for rejection");
                    returnReq.response = response;
                    returnReq.resolvedDate = now;
                }
                else throw new createError(400, "This request can only change status to APPROVED or REJECTED");
                await returnReq.save();
                return returnReq;
            }
        }

        if (hasRole(user, ["admin"]) || product.vid.toString() === user._id.toString()) {
            if (returnReq.status === "APPROVED") {
                if (status === "COMPLETED") {
                    product.stock_quantity += returnReq.quantity;
                    const totalRefunded = product.price * returnReq.quantity;
                    await product.save();

                    const transaction = new Transaction({
                        orderId: returnReq.orderId,
                        payment_method: "Refund",
                        amount: totalRefunded,
                    });
                    await transaction.save();
                    returnReq.status = "COMPLETED"
                    returnReq.refundAmount = totalRefunded;
                    returnReq.response = `A refund of ${totalRefunded}$ was issued to your original payment method on ${now.toString()}.`;
                    returnReq.resolvedDate = now;
                    await returnReq.save();
                    return { returnReq, transactionId: transaction._id };
                }
                else throw new createError(400, "APPROVED request can only change status to COMPLETE");
            }
        }
        if (returnReq.status === "COMPLETE" || returnReq.status === "REJECTED") throw new createError(400, "Request already COMPLETED or REJECTED");
        throw new createError(403, "Unauthorized action.");
    } catch (error) {
        throw error
    }
}
exports.getReturnReqs = async (user, query = {}) => {
    try {
        const filter = hasRole(user, ["admin"]) ? {} : { customerId: user._id };
        let page = parseInt(query.page) > 0 ? parseInt(query.page) : 1;
        const limit = parseInt(query.limit) > 0 ? parseInt(query.limit) : 10;
        const totalRequest = await ReturnRequest.countDocuments(filter);
        const totalPages = Math.ceil(totalRequest / limit)||1;

        if (page > totalPages) page = totalPages

        const skip = (page - 1) * limit;
        const returnReqs = await ReturnRequest.find(filter)
            .populate("orderId productId")
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);
        
        return {
            returnReqs,
            pagination: {
                currentPage: page,
                totalPages,
                totalRequest,
                limit
            }
        }
    } catch (error) {
        throw error
    }
}

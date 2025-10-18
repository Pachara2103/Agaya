const ReturnRequest = require("../models/return-request");
const Order = require("../models/order");
const Contain = require("../models/contain");
const Product = require("../models/product");
const Transaction = require("../models/transaction");
const createError = require("http-errors");

const hasRole = (user, roles) =>
    user.userType.some((role) => roles.includes(role));

exports.requestReturn = async (requestBody, user) => {
    try {
        const { orderId, products, reason } = requestBody;
        const customerId = user._id;

        if (!reason) throw new createError(400, "Plese provide reason");

        const order = await Order.findOne({ _id: orderId });
        if (!order) throw new createError(404, "order not found");
        if (order.customerId.toString() !== customerId.toString()) throw new createError(403, "Unauthorized request");

        const status = order.orderTracking[order.orderTracking.length - 1].statusKey;
        if (!["DELIVERED"].includes(status)) {
            throw new createError(400, "Only DELIVERED order can be refunded");
        }
        // Order older than 30 day cant be return
        const now = new Date();
        const orderDate = new Date(order.orderDate);
        const orderDuration = (now - orderDate) / (24 * 60 * 60 * 1000);
        if (orderDuration > 30) throw new createError(400, "Order older than 30 day cant be return");

        const validProducts = [];

        for (const item of products) {
            const {productId, quantity} = item;
            const containProduct = await Contain.findOne({ orderId, productId });
            if (!containProduct)
                throw new createError(400, `Product ${productId} not found in order ${orderId}`);

            if (quantity > containProduct.quantity)
                throw new createError(400, `Return quantity exceeds purchased amount for product ${productId}`);

            validProducts.push({productId, quantity});
        }

        const returnRequest = new ReturnRequest({
            orderId,
            customerId,
            products: validProducts,
            reason,
            status: "PENDING",
            response: "Your request is being reviewed. You will be notified of the outcome within 3-5 business days."
        });

        order.orderTracking.push({statusKey: "DISPUTED"})
        await order.save();
        await returnRequest.save();
        return returnRequest;
    } catch (error) {
        throw error;
    }

}

exports.submitReturnTrackingIdService = async (req, body, user) => {
    const { orderId } = req;
    const { trackingId } = body;
    try {
        if (!trackingId || trackingId.trim() === "") {
            throw new createError(400, "Tracking ID is required.");
        }
        
        const returnReq = await ReturnRequest.findOne({ orderId: orderId, customerId: user._id });
        if (!returnReq) throw new createError(404, "Return request not found for this order.");

        if (returnReq.customerId.toString() !== user._id.toString()) {
             throw new createError(403, "Unauthorized request.");
        }
        if (returnReq.status !== "APPROVED") {
            throw new createError(400, `Cannot submit tracking ID. Return request status is ${returnReq.status}. Must be APPROVED.`);
        }

        returnReq.trackingId = trackingId.trim();
        returnReq.status = "SHIPPED"; 
        returnReq.response = `Tracking ID (${trackingId}) received. Waiting for vendor to confirm reception.`;
        
        await returnReq.save();

        const order = await Order.findById(orderId);
        if (order) {
            order.orderTracking.push({statusKey: "RETURN_SHIPPED"})
            await order.save();
        }
        
        return returnReq;
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
        const order = await Order.findById(returnReq.orderId);

        const now = new Date();
        if (hasRole(user, ["admin"])) {
            if (returnReq.status === "PENDING") {
                if (status === "APPROVED") {
                    returnReq.status = status;
                    returnReq.response = "Plese return the item to the vendor";
                    order.orderTracking.push({statusKey: "APPROVED"}) 
                    await order.save();
                }
                else if (status === "REJECTED") {
                    returnReq.status = status;
                    if (!response) throw new createError(400, "Plese provide reason for rejection");
                    returnReq.response = response;
                    returnReq.resolvedDate = now;
                    order.orderTracking.push({statusKey: "COMPLETED"})
                    await order.save();
                }
                else throw new createError(400, "This request can only change status to APPROVED or REJECTED");
                await returnReq.save();
                return returnReq;
            }
        }

        if (hasRole(user, ["admin"]) || order.vendorId.toString() === user._id.toString()) {
            if (returnReq.status === "APPROVED") {
                if (status === "COMPLETED") {
                    let totalRefunded = 0;
                    for (const item of returnReq.products) {
                        const product = await Product.findById(item.productId);
                        if (!product) throw new createError(404, `Product ${item.productId} not found.`);
                        product.stockQuantity += item.quantity;
                        await product.save();
                        totalRefunded += product.price * item.quantity;
                    }

                    const transaction = new Transaction({
                        orderId: returnReq.orderId,
                        paymentMethod: "Refund",
                        amount: totalRefunded,
                    });
                    await transaction.save();
                    returnReq.status = "COMPLETED"
                    returnReq.refundAmount = totalRefunded;
                    returnReq.response = `A refund of ${totalRefunded}$ was issued to your original payment method on ${now.toString()}.`;
                    returnReq.resolvedDate = now;
                    await returnReq.save();
                    order.orderTracking.push({statusKey: "REFUNDED"})
                    await order.save();
                    return { returnReq, transactionId: transaction._id };
                }
                else throw new createError(400, "APPROVED request can only change status to COMPLETED");
            }
        }
        if (returnReq.status === "COMPLETED" || returnReq.status === "REJECTED") throw new createError(400, "Request already COMPLETED or REJECTED");
        throw new createError(403, "Unauthorized action.");
    } catch (error) {
        throw error
    }
}
exports.getReturnReqs = async (user, query = {}) => {
    try {
        const filter = hasRole(user, ["admin"]) ? {} : { customerId: user._id };
        if (query.status) filter.status = query.status;
        let page = parseInt(query.page) > 0 ? parseInt(query.page) : 1;
        const limit = parseInt(query.limit) > 0 ? parseInt(query.limit) : 10;
        const totalRequest = await ReturnRequest.countDocuments(filter);
        const totalPages = Math.ceil(totalRequest / limit)||1;

        if (page > totalPages) page = totalPages

        const skip = (page - 1) * limit;
        const returnReqs = await ReturnRequest.find(filter)
            .populate("orderId products.productId")
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

exports.getReturnReqsByVendor = async (user, query = {}) => {
    try {
        const filter = {};
        const vendorOrders = await Order.find({ vendorId: user._id }).select("_id");
        filter.orderId = { $in: vendorOrders.map(o => o._id) };
        if (query.status) filter.status = query.status;

        let page = parseInt(query.page) > 0 ? parseInt(query.page) : 1;
        const limit = parseInt(query.limit) > 0 ? parseInt(query.limit) : 10;
        const totalRequest = await ReturnRequest.countDocuments(filter);
        const totalPages = Math.ceil(totalRequest / limit)||1;

        if (page > totalPages) page = totalPages

        const skip = (page - 1) * limit;
        const returnReqs = await ReturnRequest.find(filter)
            .populate("orderId products.productId")
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

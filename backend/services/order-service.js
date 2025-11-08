const Order = require("../models/order");
const Addto = require("../models/addto");
const Contain = require("../models/contain");
const Product = require("../models/product");
const Transaction = require("../models/transaction");
const Cart = require("../models/cart");
const mongoose = require("mongoose");
const createError = require('http-errors');
const { getOrderDetailsPipeline, calculatePagination } = require("../utils/orderUtil.js");
const User = require("../models/user.js");
const Vendor = require("../models/vendor.js");

const hasRole = (user, roles) =>
  user.userType.some((role) => roles.includes(role));

exports.checkoutOrder = async (orderData, user) => {
  const session = await Order.startSession();
  session.startTransaction();

  try {
    orderData.customerId = user._id;
    const { cartId, customerId, paymentMethod, selectedItem, selectedAddress } = orderData;

    const carts = await Cart.findOne({ customerId: customerId, _id: cartId });
    if (!carts)
      throw new createError(
        404, `There no cart with id of ${cartId} that belong to customer ${customerId}`
      );

    if (!cartId || !customerId || !paymentMethod || !selectedAddress) {
      throw new createError(
        400, "Missing required fields"
      );
    }

    if (!selectedItem || !selectedItem.length) throw new createError(400, "No select item");
    const cartItems = await Addto.find({ _id: { $in: selectedItem } }).session(session); // Find product
    if (!cartItems.length) {
      throw new createError(404, "Select item not found");
    }

    const invalidItem = cartItems.filter(item => item.cartId.toString() !== cartId.toString());
    if (invalidItem.length > 0) {
      throw new createError(404, `Item IDs: ${invalidItems.map(i => i._id).join(", ")} not belong to your cart`);
    }
    // console.log(cartItems)

    const itemsByVendor = {};
    for (let item of cartItems) {
      // console.log(item);
      const product = await Product.findOne({ _id: item.productId }).session(session);
      if (!product) throw new createError(404, `Product ${item.productId} not found`);
      if (product.stockQuantity < item.quantity) {
        throw new createError(400, `Not enough stock for product ${item.productId}`);
      }
      // Saperate item by vendor  
      const vendorId = product.vendorId.toString();
      if (!itemsByVendor[vendorId]) itemsByVendor[vendorId] = [];
      itemsByVendor[vendorId].push({ item, product });
    }

    const createdOrders = [];

    for (const [vendorId, vendorItem] of Object.entries(itemsByVendor)) {
      let totalAmount = 0;
      const order = new Order({
        // orderStatus: "PAID", 
        // have to do payment first 
        cartId,
        customerId,
        vendorId,
        shippingAddress: selectedAddress,
        orderTracking: [
          {
            statusKey: 'ORDER_RECEIVED',
            description: 'คำสั่งซื้อได้รับการยืนยันและรอเตรียมการจัดส่ง',
            timestamp: new Date()
          }
        ]
      });
      await order.save({ session });

      for (const { item, product } of vendorItem) {
        totalAmount += item.quantity * product.price;
        product.stockQuantity -= item.quantity;
        await product.save({ session });

        const contain = new Contain({
          productId: item.productId,
          orderId: order._id,
          quantity: item.quantity,
        });
        await contain.save({ session });
      }

      const transaction = new Transaction({
        orderId: order._id,
        paymentMethod: paymentMethod,
        amount: totalAmount.toFixed(2),
      });

      await transaction.save({ session });
      createdOrders.push({ order, transaction });

    }

    await Addto.deleteMany({ _id: { $in: selectedItem } }).session(session);

    await session.commitTransaction();
    session.endSession();

    return createdOrders;

  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    throw err;
  }
};

const statusFlow = {
  ORDER_RECEIVED: { next: ["PICKED_UP", "CANCELLED"], roles: ["customer", "vendor", "admin"] },
  PICKED_UP: { next: ["IN_TRANSIT"], roles: ["vendor", "admin"] },
  IN_TRANSIT: { next: ["DELIVERED", "FAILED_ATTEMPT"], roles: ["vendor", "admin"] },
  FAILED_ATTEMPT: { next: ["IN_TRANSIT"], roles: ["vendor", "admin"] },
  DELIVERED: { next: ["COMPLETED"], roles: ["customer", "admin"] },
  COMPLETED: { next: [], roles: [] },
  RETURN_SHIPPED: { next: ["COMPLETED", "REFUNDED"], roles: ["vendor", "admin"] },
  DISPUTED: { next: ["COMPLETED"], roles: ["admin"]}
};
const defaultDescriptions = {
  ORDER_RECEIVED: 'คำสั่งซื้อได้รับการยืนยันและรอการจัดส่ง',
  PICKED_UP: 'ผู้ส่งได้นำพัสดุมาส่งที่จุดรับแล้ว',
  IN_TRANSIT: 'พัสดุอยู่ระหว่างขนส่ง',
  FAILED_ATTEMPT: 'การจัดส่งพัสดุไม่สำเร็จ',
  DELIVERED: 'จัดส่งสำเร็จ: พัสดุถูกจัดส่งถึงผู้รับเรียบร้อยแล้ว',
  COMPLETED: 'ลูกค้าได้รับสินค้าและการสั่งซื้อเสร็จสมบูรณ์',
  CANCELLED: 'คำสั่งซื้อถูกยกเลิก'
};

const checkAuth = async (Status, user, order) => {
  const allowRoles = statusFlow[Status].roles;

  if (hasRole(user, allowRoles)) {
    if (hasRole(user, ["admin"]) && allowRoles.includes("admin")) return true;
    if (allowRoles.includes("customer")) {
      if (user._id.toString() == order.customerId.toString()) return true
    }
    // vendorId
    try {
      const vendor = await Vendor.findById({userId: user._id})
      if (allowRoles.includes("vendor")) {
        if (vendor._id.toString() == order.vendorId.toString()) return true
      }
    } catch (err) {
      return false
    }
  }
  return false;

}

exports.addOrderTrackingEvent = async (orderId, trackingBody, user) => {
  try {
    console.log(orderId);
    const { newStatus, description } = trackingBody;

    if (!newStatus) throw new createError(400, "Missing status fields");

    const validStatuses = [
      'PICKED_UP',
      'IN_TRANSIT',
      'DELIVERED',
      'FAILED_ATTEMPT',
      'COMPLETED',
      'CANCELLED',
      'RETURN_SHIPPED',
      'REFUNDED'
    ];
    if (!validStatuses.includes(newStatus)) {
      throw new createError(
        400, `Invalid status. Valid values: ${validStatuses.join(", ")}`
      );
    }

    const order = await Order.findById(orderId);
    if (!order) throw new createError(404, "Order not found");

    const currentState = order.orderTracking[order.orderTracking.length - 1].statusKey;

    if (!statusFlow[currentState].next.includes(newStatus)) {
      throw new createError(404, `Cannot change status from ${currentState} to ${newStatus}`);
    }

    if (!checkAuth(currentState, user, order)) {
      throw new createError(403, "You are not authorized to update this order status");
    }

    if (currentState === 'RETURN_SHIPPED' && newStatus === 'COMPLETED') {
      newStatus = 'REFUNDED';
    }

    // dummy for show assume pick_up then all transit working fine until delivered
    if (newStatus === 'PICKED_UP') {
      // add PICKED_UP
      order.orderTracking.push({
        statusKey: newStatus,
        description: description || defaultDescriptions[newStatus],
        timestamp: new Date()
      });
      // add IN_TRANSIT
      order.orderTracking.push({
        statusKey: 'IN_TRANSIT',
        description: defaultDescriptions['IN_TRANSIT'],
        timestamp: new Date()
      });      
      // add DELIVERED
      order.orderTracking.push({
        statusKey: 'DELIVERED',
        description: defaultDescriptions['DELIVERED'],
        timestamp: new Date()
      });
    } else {
      order.orderTracking.push({
        statusKey: newStatus,
        description: description || defaultDescriptions[newStatus],
        timestamp: new Date()
      });
    }

    //order.orderTracking.push(trackingEvent);
    await order.save();
    // if it pass through here so it fine
    if (newStatus === 'COMPLETED' || newStatus === 'REFUNDED') {
      const transaction = await Transaction.findOne({ orderId: order._id });
      if (!transaction) {
        throw new createError(404, "Transaction not found for this order");
      }

      if (newStatus === 'REFUNDED') {
        // This is a return completion, so refund the customer.
        transaction.status = 'REFUNDED';
        transaction.refunded = true;
        transaction.refundDate = new Date();
        transaction.refundAmount = transaction.amount;
        await transaction.save();

        const customer = await User.findById(order.customerId);
        if (!customer) {
          throw new createError(404, "Customer not found for this order");
        }

        customer.balance += transaction.amount;
        await customer.save();
      } else {
        // This is a regular order completion, so pay the vendor.
        const vendor = await Vendor.findById(order.vendorId);
        if (!vendor) {
          throw new createError(404, "Vendor not found for this order");
        }

        const vendorUser = await User.findById(vendor.userId);
        if (!vendorUser) {
          throw new createError(404, "Vendor user not found");
        }

        vendorUser.balance += transaction.amount;
        await vendorUser.save();

        transaction.status = 'COMPLETED';
        await transaction.save();
      }
    }
    return order;
  } catch (err) {
    throw err;
  }
}

const getOrders = async ({ field, id, user, queryParams = {} }) => {
  try {
    let filterId = new mongoose.Types.ObjectId(id);

    // if (!hasRole(user, ["admin"])) {
    //   filterId = user._id;
    // }

    // Pagination
    const matchStage = { [field]: filterId };
    const totalOrders = await Order.countDocuments(matchStage);
    const { page, limit, totalPages, skip } = calculatePagination(totalOrders, queryParams);

    // Build pipeline instead
    const pipeline = [
      { $match: matchStage },
      ...getOrderDetailsPipeline(),
      { $skip: skip },
      { $limit: limit },
    ];

    const orders = await Order.aggregate(pipeline);
    // console.log("orders = ", orders)

    return {
      orders,
      pagination: {
        currentPage: page,
        totalPages,
        totalOrders,
        limit,
      },
    };
  } catch (err) {
    throw err;
  }
};

exports.getOrder = async (orderId) => {
  try {
    const order = await Order.findById(orderId);
    if (!order) {
      throw new Error("Order not found");
    }
    return order;
  } catch(err) {
    console.error("Error in getOrders:", err);
    throw err;
  }
};

// Exported helper functions
exports.getOrdersByCustomer = async (customerId, user, queryParams) => {
  return await getOrders({ field: "customerId", id: customerId, user, queryParams });
}

exports.getOrdersByVendor = async (vendorId, user, queryParams) => {
  return await getOrders({ field: "vendorId", id: vendorId, user, queryParams });
}

/* Output example
{
    "success": true,
    "orders": [
        {
            "_id": "68e22c2338854b09f61b5ed7",
            "orderStatus": "PAID",
            "orderDate": "2025-10-05T08:28:19.168Z",
            "customer_id": "68e227cec54f687261180ce9",
            "contains": [
                {
                    "product_id": "68c6f90d42c4d92f49b2b6e6",
                    "name": "Sample 2Product",
                    "price": 199.99,
                    "quantity": 4,
                    "total_price": 799.96
                },
                {
                    "product_id": "68c6f9136b57f2998888277b",
                    "name": "เครื่องนวดท่านชายสีดำ",
                    "price": 399,
                    "quantity": 3,
                    "total_price": 1197
                }
            ],
            "order_total": 1996.96
        }
    ]
}
*/

exports.cancelOrder = async (orderId, user, cancelBody) => {
  const session = await Order.startSession();
  session.startTransaction();

  try {
    if (!orderId) throw new createError(400, "Missing order ID");

    const order = await Order.findById(orderId).session(session);
    if (!order) throw new createError(404, "Order not found");

    const isAdmin = hasRole(user, ["admin"]);
    const isOwner = user._id.toString() === order.customerId.toString();

    if (!isAdmin && !isOwner) throw new createError(403, "You are not authorized to cancel this order");

    const currentState = (order.orderTracking && order.orderTracking.length) ? order.orderTracking[order.orderTracking.length - 1].statusKey : null;

    if (currentState !== 'ORDER_RECEIVED') throw new createError(400, `Cannot cancel order at status ${currentState}`);

    const contains = await Contain.find({ orderId: order._id }).session(session);

    for (const item of contains) {

      const product = await Product.findById(item.productId).session(session);

      if (!product) throw new createError(404, `Product ${item.productId} not found while cancelling order`);

      product.stockQuantity += item.quantity;
      await product.save({ session });
    }

    const transaction = await Transaction.findOne({ orderId: order._id }).session(session);
    const user2 = await User.findOne({_id: user._id}).session(session);
    if (transaction) {
      // ????
      // model does not have it 
      transaction.refunded = true;
      transaction.refundDate = new Date();
      transaction.refundAmount = transaction.amount;
      transaction.refundNote = cancelBody.refundNote || "Cancelled by customer before shipping";
      // model does not have it 
      if (transaction.paymentMethod === "CREDIT_CARD") {
        user2.balance += transaction.amount;
        await user2.save({ session });
      }
      await transaction.save({ session });
    }

    const description = cancelBody.reason || defaultDescriptions.CANCELLED;

    order.orderTracking.push({
      statusKey: 'CANCELLED',
      description: description,
      timestamp: new Date()
    });

    await order.save({ session });

    await session.commitTransaction();
    session.endSession();

    const updatedOrder = await Order.findById(order._id);
    return updatedOrder;

  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    throw err;
  }
};
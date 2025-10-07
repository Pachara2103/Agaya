const Order = require("../models/order");
const Addto = require("../models/addto");
const Contain = require("../models/Contain");
const Product = require("../models/product");
const Transaction = require("../models/transaction");
const Cart = require("../models/cart");
const mongoose = require("mongoose");
const createError = require('http-errors'); 

const hasRole = (user, roles) =>
    user.userType.some((role) => roles.includes(role));

exports.checkoutOrder = async (orderData, user) => {
  const session = await Order.startSession();
  session.startTransaction();

  try {
    orderData.cid = user._id;
    const { cart_id, cid, payment_method } = orderData;

    const carts = await Cart.findOne({ uid: cid, _id: cart_id });
    if (!carts)
      throw new createError(
        404, `There no cart with id of ${cart_id} that belong to customer ${cid}`
      );

    if (!cart_id || !cid || !payment_method) {
      throw new createError(
        400, "Missing required fields"
      );
    }

    const cartItems = await Addto.find({ cart_id }).session(session); // Find product
    if (!cartItems.length) {
      throw new createError(400, "Cart is empty");
    }

    const order = new Order({ order_status: "NOT_PAID", cart_id, cid });
    await order.save({ session });

    let totalAmount = 0;

    for (let item of cartItems) {
      console.log(item);
      const product = await Product.findOne({ _id: item.pid }).session(session);
      if (!product) throw new createError(404, `Product ${item.pid} not found`);
      if (product.stock_quantity < item.quantity) {
        throw new createError(400, `Not enough stock for product ${item.pid}`);
      }

      totalAmount += item.quantity * product.price;
      product.stock_quantity -= item.quantity;
      await product.save({ session });

      const contain = new Contain({
        pid: item.pid,
        oid: order._id,
        quantity: item.quantity,
      });
      await contain.save({ session });
    }

    await Addto.deleteMany({ cart_id }).session(session);

    const transaction = new Transaction({
      oid: order._id,
      payment_method: payment_method,
      amount: totalAmount.toFixed(2),
    });
    await transaction.save({ session });

    await session.commitTransaction();
    session.endSession();

    return {orderId: order._id, transactionId: transaction._id};

  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    throw err;
  }
};

exports.updateOrderStatus = async (orderId, status, user) => {
  try {

    const validStatuses = ["NOT_PAID", "PAID", "COMPLETED"];
    if (!validStatuses.includes(status)) {
      throw new createError(
        400, `Invalid status. Valid values: ${validStatuses.join(", ")}`
      );
    }

    //console.log("orderId:", orderId);

    const order = await Order.findById(orderId);

    if (!order) {
      throw new createError(
        404, "Order not found"
      );
    }

    //console.log(user);

    if (hasRole(user, ["admin"])) {
    }
    // Customer can change NOT_PAID -> PAID
    else if (
      hasRole(user, ["customer"]) &&
      status === "PAID" &&
      order.order_status === "NOT_PAID"
    ) {
      if (order.cid.toString() !== user._id.toString()) {
        throw new createError(
          403, "Unauthorized to update this order"
        );
      }
    }
    //Vendor can change PAID -> COMPLETED
    else if (
      hasRole(user, ["vendor"]) &&
      status === "COMPLETED" &&
      order.order_status === "PAID"
    ) {
    } else {
      throw new createError(
          403, "Unauthorized action"
      );
    }

    order.order_status = status;
    await order.save();

    return order;

  } catch (err) {
    throw err;
  }
};

exports.getOrdersByCustomer = async (cid, user, queryParams = {}) => {
  try {

    // Find all orders for this customer
    cid = new mongoose.Types.ObjectId(cid);
    if(!hasRole(user,["admin"])) cid = user._id;
    //console.log(customerId);

    //Pagination
    
    const page = parseInt(queryParams.page) > 0 ? parseInt(queryParams.page) : 1;
    const limit = parseInt(queryParams.limit) > 0 ? parseInt(queryParams.limit) : 10;
    const totalOrders = await Order.countDocuments({ cid });
    const totalPages = Math.ceil(totalOrders / limit);

    if (page > totalPages) page = totalPage

    const skip = (page - 1) * limit;

    const orders = await Order.aggregate([
      //  Match only orders of this customer
      { $match: { cid } },

      //  Join contains collection
      {
        $lookup: {
          from: "contains",
          localField: "_id",
          foreignField: "oid",
          as: "contains",
        },
      },

      { $unwind: "$contains" },

      //join product
      {
        $lookup: {
          from: "products",
          localField: "contains.pid",
          foreignField: "_id",
          as: "product",
        },
      },

      { $unwind: "$product" },

      {
        $group: {
          _id: "$_id",
          order_status: { $first: "$order_status" },
          order_date: { $first: "$order_date" },
          customer_id: { $first: "$cid" },
          contains: {
            $push: {
              product_id: "$product._id",
              name: "$product.product_name",
              price: "$product.price",
              quantity: "$contains.quantity",
              total_price: {
                $multiply: ["$product.price", "$contains.quantity"],
              },
            },
          },
        },
      },

      {
        $addFields: {
          order_total: { $sum: "$contains.total_price" },
        },
      },

      { $sort: { order_date: -1 } },

      { $skip : skip },

      { $limit : limit }
    ]);

    if (!orders.length) {
      throw new createError(
        404, `No orders belong to user ${cid}`
      );
    }

    return { 
      orders,
      pagination: {
        currentPage: page,
        totalPages,
        totalOrders,
        limit
      }
    };
  } catch (err) {
    throw err;
  }
};
/* Output example
{
    "success": true,
    "orders": [
        {
            "_id": "68e22c2338854b09f61b5ed7",
            "order_status": "PAID",
            "order_date": "2025-10-05T08:28:19.168Z",
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
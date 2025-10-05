const Order = require("../models/order");
const Addto = require("../models/addto");
const Contain = require("../models/Contain");
const Product = require("../models/product");
const Transaction = require("../models/transaction");
const Cart = require("../models/cart");
const mongoose = require("mongoose");

//POST /api/v1/agaya/orders/checkout
exports.checkoutOrder = async (req, res) => {
  const session = await Order.startSession();
  session.startTransaction();

  try {
    req.body.cid = req.user._id;
    const { cart_id, cid, payment_method } = req.body;

    const carts = await Cart.findOne({ uid: cid, _id: cart_id });
    if (!carts)
      throw new Error(
        `There no cart with id of ${cart_id} that belong to customer ${cid}`
      );

    if (!cart_id || !cid || !payment_method) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const cartItems = await Addto.find({ cart_id }).session(session); // Find product
    if (!cartItems.length) {
      throw new Error("Cart is empty");
    }

    const order = new Order({ order_status: "NOT_PAID", cart_id, cid });
    await order.save({ session });

    let totalAmount = 0;

    for (let item of cartItems) {
      console.log(item);
      const product = await Product.findOne({ _id: item.pid }).session(session);
      if (!product) throw new Error(`Product ${item.pid} not found`);
      if (product.stock_quantity < item.quantity) {
        throw new Error(`Not enough stock for product ${item.pid}`);
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

    res.status(201).json({
      message: "Checkout successful",
      orderId: order._id,
      transactionId: transaction._id,
    });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    res.status(500).json({ error: err.message });
  }
};

//PATCH /api/v1/agaya/orders/:orderId/status
exports.updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const validStatuses = ["NOT_PAID", "PAID", "COMPLETED"];
    if (!validStatuses.includes(status)) {
      return res
        .status(400)
        .json({
          error: `Invalid status. Valid values: ${validStatuses.join(", ")}`,
        });
    }

    console.log("orderId:", orderId);

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    const hasRole = (user, roles) =>
      user.userType.some((role) => roles.includes(role));
    console.log(req.user);

    if (hasRole(req.user, ["admin"])) {
    }
    // Customer can change NOT_PAID -> PAID
    else if (
      hasRole(req.user, ["customer"]) &&
      status === "PAID" &&
      order.order_status === "NOT_PAID"
    ) {
      if (order.cid.toString() !== req.user._id.toString()) {
        return res
          .status(403)
          .json({ error: "Unauthorized to update this order" });
      }
    }
    //Vendor can change PAID -> COMPLETED
    else if (
      hasRole(req.user, ["vendor"]) &&
      status === "COMPLETED" &&
      order.order_status === "PAID"
    ) {
    } else {
      return res.status(403).json({ error: "Unauthorized action" });
    }

    order.order_status = status;
    await order.save();

    res.status(200).json({ message: "Order status updated", order });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getOrdersByCustomer = async (req, res) => {
  try {
    const { cid } = req.params; // customer ID

    // Find all orders for this customer
    const customerId = new mongoose.Types.ObjectId(cid);
    console.log(customerId);
    const orders = await Order.aggregate([
      //  Match only orders of this customer
      { $match: { cid: customerId } },

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
    ]);
    console.log("orderId:", cid);
    if (!orders.length) {
      return res.status(404).json({ message: "No orders found" });
    }

    res.status(200).json({ orders });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

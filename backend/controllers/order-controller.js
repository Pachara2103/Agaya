const Order = require("../models/Order");
const Addto = require("../models/addto");
const Contain = require("../models/Contain");
const Product = require("../models/product");
const Transaction = require("../models/transaction");

//POST /api/v1/agaya/orders/checkout
exports.checkoutOrder = async(req, res) => {

    const session = await Order.startSession();
    session.startTransaction();
    
    try {

        const { cart_id, cid, payment_method } = req.body;

        if (!cart_id || !cid || !payment_method) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const cartItems = await Addto.find({ cart_id }).session(session); // Find product
        if (!cartItems.length) {
            throw new Error("Cart is empty");
        }

        const order = new Order({ order_status : "NOT_PAID" , cart_id, cid });
        await order.save({ session });

        let totalAmount = 0;

        for(let item of cartItems){
            console.log(item);
            const product = await Product.findOne({ _id : item.pid }).session(session);
            if (!product) throw new Error(`Product ${item.pid} not found`);
            if (product.stock_quantity < item.quantity){
                throw new Error(`Not enough stock for product ${item.pid}`);
            }

            totalAmount += item.quantity * product.price;
            product.stock_quantity -= item.quantity;
            await product.save({ session });

            const contain = new Contain({
                pid : item.pid,
                oid : order._id,
                quantity : item.quantity
            });
            await contain.save({ session });

        }

        await Addto.deleteMany({cart_id}).session(session);

        const transaction = new Transaction({
            oid: order._id,
            payment_method: payment_method,
            amount: totalAmount.toFixed(2),
        });
        await transaction.save({ session })

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
}

//PATCH /api/v1/agaya/orders/:orderId/status
exports.updateOrderStatus = async (req, res) => {
    try {
        const{ orderId } = req.params;
        const{ status } = req.body;

        const validStatuses = ['NOT_PAID', 'PAID', 'COMPLETED'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ error: `Invalid status. Valid values: ${validStatuses.join(', ')}` });
        }

        console.log("orderId:", orderId);

        const order = await Order.findByIdAndUpdate(
            orderId,
            { order_status: status },
            { new: true } // return updated document
        );

        if (!order) {
            return res.status(404).json({ error: "Order not found"});
        }

        res.status(200).json({ message: "Order status updated", order });
            
    } catch (err) {
        res.status(500).json({ error: err.message });
    }

}

exports.getOrdersByCustomer = async (req, res) => {
  try {
    const { cid } = req.params; // customer ID

    // Find all orders for this customer
    const orders = await Order.find({ cid }).sort({ order_date: -1 });
    console.log("orderId:", cid);
    if (!orders.length) {
      return res.status(404).json({ message: "No orders found" });
    }

    res.status(200).json({ orders });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
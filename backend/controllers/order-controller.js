const {checkoutOrder, updateOrderStatus, getOrdersByCustomer, getOrdersByVendor} = require("../services/order-service");

//POST /api/v1/agaya/orders/checkout
exports.checkoutOrder = async (req, res, next) => {
  try{
    const createdOrders = await checkoutOrder(req.body, req.user);
    res.status(201).json({success:true, message: "Checkout successful", data:createdOrders});
  } catch (err) {
    next(err);
  }
};

//PATCH /api/v1/agaya/orders/:orderId/status
//req.body = { "status" : "PAID"}
exports.updateOrderStatus = async (req, res, next) => {
  try {
    const {order} = await updateOrderStatus(req.params.orderId, req.body.status, req.user);
    res.status(200).json({ sucess: true, message: "Order status updated", data : order });
  } catch (err) {
    next(err);
  }
};

exports.getOrdersByCustomer = async (req, res, next) => {
  try {
    const orderByCustomer = await getOrdersByCustomer(req.params.cid, req.user, req.query)
    res.status(200).json({success:true, data: orderByCustomer });
  } catch (err) {
    next(err);
  }
};

exports.getOrdersByVendor = async (req, res, next) => {
  try {
    const orderByVendor = await getOrdersByVendor(req.params.vid, req.user, req.query)
    res.status(200).json({success:true, data: orderByVendor });
  } catch (err) {
    next(err);
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
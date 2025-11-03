const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const orderService = require("./order-service");
const Addto = require("../models/addto");
const Product = require("../models/product");
const createError = require("http-errors");

exports.createCheckoutSession = async (orderData, user) => {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new createError(500, "Stripe secret key not configured.");
  }

  const { selectedItem, cartId, paymentMethod, selectedAddress } = orderData;
  if (!selectedItem || !selectedItem.length) {
    throw new createError(400, "No items selected for checkout.");
  }

  const cartItems = await Addto.find({ _id: { $in: selectedItem } });

  const line_items = await Promise.all(
    cartItems.map(async (item) => {
      const product = await Product.findById(item.productId);
      if (!product) {
        throw new createError(404, `Product ${item.productId} not found`);
      }
      return {
        price_data: {
          currency: "thb",
          product_data: {
            name: product.productName,
          },
          unit_amount: Math.round(product.getFinalPrice() * 100),
        },
        quantity: item.quantity,
      };
    })
  );

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items,
    mode: "payment",
    success_url: `${process.env.FRONTEND_URL || "http://localhost:5173"}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.FRONTEND_URL || "http://localhost:5173"}/checkout`,
    metadata: {
      cartId,
      selectedItem: JSON.stringify(selectedItem),
      paymentMethod,
      selectedAddress: JSON.stringify(selectedAddress),
    },
    customer_email: user.email,
  });

  return session;
};

exports.verifyPayment = async (sessionId, user) => {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new createError(500, "Stripe secret key not configured.");
  }

  const session = await stripe.checkout.sessions.retrieve(sessionId);

  if (session.payment_status !== "paid") {
    throw new createError(400, "Payment not successful yet.");
  }

  let selectedItem, selectedAddress;

  try {
    selectedItem = JSON.parse(session.metadata.selectedItem);
    selectedAddress = JSON.parse(session.metadata.selectedAddress);
  } catch (e) {
    throw new createError(500, "Invalid metadata in payment session.");
  }

  const orderData = {
    cartId: session.metadata.cartId,
    customerId: user._id,
    paymentMethod: session.metadata.paymentMethod || "card",
    selectedItem,
    selectedAddress,
    transactionId: session.id, 
  };

  return { success: true, orderData };
};

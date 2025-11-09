const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/payment-controller');
const { protect } = require('../middleware/auth');

router.post('/create-checkout-session', protect, paymentController.createCheckoutSession);
router.post('/verify-payment', protect, paymentController.verifyPayment);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Payments
 *   description: API endpoints for handling payment checkout and verification using Stripe
 */

/**
 * @swagger
 * /payment/create-checkout-session:
 *   post:
 *     summary: Create a Stripe Checkout session
 *     description: Initiates a checkout session with Stripe for selected products in the cart. Requires authentication.
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - orderData
 *             properties:
 *               orderData:
 *                 type: object
 *                 required:
 *                   - selectedItem
 *                   - cartId
 *                   - paymentMethod
 *                   - selectedAddress
 *                 properties:
 *                   selectedItem:
 *                     type: array
 *                     description: List of item IDs for checkout.
 *                     items:
 *                       type: string
 *                       example: "671a4f83e9b11c2d34ab01f3"
 *                   cartId:
 *                     type: string
 *                     description: Cart ID that contains the selected items.
 *                     example: "671a4d91e9b11c2d34ab01ef"
 *                   paymentMethod:
 *                     type: string
 *                     description: Selected payment method (e.g. card, cash-on-delivery)
 *                     example: "card"
 *                   selectedAddress:
 *                     type: object
 *                     description: Shipping address selected by the user.
 *                     example:
 *                       user: "68f0d061aaae57af8b39beba"
 *                       name: "Conan Doyle"
 *                       phoneNumber: "0925436871"
 *                       address: "221B, Baker street, London"
 *     responses:
 *      200:
 *        description: Stripe checkout session created successfully
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                url:
 *                  type: string
 *                  description: Stripe-hosted checkout URL
 *                  example: "https://checkout.stripe.com/pay/cs_test_abc123xyz"
 *      400:
 *        description: Missing or invalid order data
 *      500:
 *        description: Stripe secret key not configured or internal server error
 */

/**
 * @swagger
 * /payment/verify-payment:
 *   post:
 *     summary: verify payment after Stripe checkout
 *     description: Verifies payment status with Stripe using the session ID and returns order data if successful. Requires authentication
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - sessionId
 *             properties:
 *               sessionId:
 *                 type: string
 *                 description: Stripe checkout session ID returned after successful payment
 *     responses:
 *       200:
 *         description: Payment verified successfully
 *         content:
 *           application/json:
*             schema:
*               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 orderData:
 *                   type: object
 *                   properties:
 *                     cartId:
 *                       type: string
 *                       example: "671a4d91e9b11c2d34ab01ef"
 *                     customerId:
 *                       type: string
 *                       example: "68f0d061aaae57af8b39beba"
 *                     paymentMethod:
 *                       type: string
 *                       example: "card"
 *                     selectedItem:
 *                       type: array
 *                       items:
 *                         type: string
 *                         example: "371a4d83e9b11c2d34ab01f3"
 *                     selectedAddress:
 *                       type: object
 *                       example:
 *                         user: "68f0d061aaae57af8b39beba"
 *                         name: "Conan Doyle"
 *                         phoneNumber: "0925436871"
 *                         address: "221B, Baker street, London"
 *                     transactionId:
 *                       type: string
 *                       example: "cs_test_a1b2c3d4e5f6"
 *       400:
 *         description: Payment not successful yet
 *       500:
 *         description: Stripe confuguration or metadata parsing error  
 */

/**
 * @swagger
 * components: 
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */
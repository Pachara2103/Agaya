const nodemailer = require('nodemailer');
const createError = require('http-errors');
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

exports.sendPaymentSuccessEmail = async (user, orders) => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
    throw new createError(500, 'Email credentials not configured.');
  }

  let totalAmount = 0;
  let orderDetails = '';
  const attachments = [];
  let tmp_name = "";

  for (const order of orders) {
    totalAmount += parseFloat(order.transaction.amount);
    tmp_name = order.order.shippingAddress.name;
    const itemsHtml = await Promise.all(order.order.contains.map(async (item) => {
      const cid = uuidv4();
      try {
        const response = await axios.get(item.image, { responseType: 'arraybuffer' });
        const imageBuffer = Buffer.from(response.data, 'binary');
        attachments.push({
          filename: `${item.name}.jpg`,
          content: imageBuffer,
          cid: cid,
        });

        return `
          <tr>
            <td style="padding: 8px;">
              <img src="cid:${cid}" alt="${item.name}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 5px;" />
            </td>
            <td style="padding: 8px;">${item.name}</td>
            <td style="text-align: right; padding: 8px;">${item.quantity}</td>
            <td style="text-align: right; padding: 8px;">THB ${item.price.toFixed(2)}</td>
          </tr>
        `;
      } catch (error) {
        console.error(`Failed to fetch image for ${item.name}:`, error);
        // Fallback to a placeholder or just text if the image fails to load
        return `
          <tr>
            <td style="padding: 8px;" colspan="2">${item.name} (Image not available)</td>
            <td style="text-align: right; padding: 8px;">${item.quantity}</td>
            <td style="text-align: right; padding: 8px;">THB ${item.price.toFixed(2)}</td>
          </tr>
        `;
      }
    }));

    orderDetails += `
      <div style="margin-bottom: 20px; border-bottom: 1px solid #ddd; padding-bottom: 20px;">
        <h3 style="color: #333;">Order ID: ${order.order._id}</h3>
        <p style="color: #555;">Vendor ID: ${order.order.vendorId}</p>
        <table style="width: 100%; border-collapse: collapse;">
          <thead>
            <tr>
              <th style="text-align: left; padding: 8px; border-bottom: 1px solid #ddd;">Product</th>
              <th style="text-align: left; padding: 8px; border-bottom: 1px solid #ddd;"></th>
              <th style="text-align: right; padding: 8px; border-bottom: 1px solid #ddd;">Quantity</th>
              <th style="text-align: right; padding: 8px; border-bottom: 1px solid #ddd;">Price</th>
            </tr>
          </thead>
          <tbody>
            ${itemsHtml.join('')}
          </tbody>
        </table>
      </div>
    `;
  }

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: user.email,
    subject: 'Payment Successful - Your Agaya Order',
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
        <div style="text-align: center; padding-bottom: 20px; border-bottom: 1px solid #ddd;">
          <h1 style="color: #4CAF50;">Thank You for Your Order!</h1>
        </div>
        <div style="padding: 20px 0;">
          <p>Hi ${tmp_name},</p>
          <p>Your payment was successful. We've received your order and will process it shortly. Here are the details:</p>
        </div>
        ${orderDetails}
        <div style="text-align: right; padding-top: 20px; border-top: 1px solid #ddd;">
          <h2 style="color: #333;">Total Amount: THB ${totalAmount.toFixed(2)}</h2>
        </div>
        <div style="padding-top: 20px;">
          <p>We will notify you again once your order has been shipped.</p>
          <p>Thank you for shopping with Agaya!</p>
        </div>
        <div style="text-align: center; padding-top: 20px; font-size: 12px; color: #777;">
          <p>&copy; ${new Date().getFullYear()} Agaya. All rights reserved.</p>
        </div>
      </div>
    `,
    attachments: attachments,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};
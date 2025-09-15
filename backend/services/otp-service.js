const nodemailer = require("nodemailer");
const crypto = require("crypto");
const Otp = require("../models/otp");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// otp generator
const generateOtp = () => {
  return crypto.randomInt(100000, 999999).toString();
};

exports.generateAndSendEmailOtp = async (email) => {
  const otp = generateOtp();

  // prepare when user click ensure it deleted previous one
  await Otp.deleteOne({ email: email });

  // create new otp
  const otpEntry = new Otp({
    email: email,
    otp: otp,
  });
  await otpEntry.save();

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your One-Time Password (OTP)",
    text: `Your OTP is: ${otp}\nIt is valid for 5 minutes.`,
    html: `<p>Your OTP is: <strong>${otp}</strong></p><p>It is valid for 5 minutes.</p>`,
  };

  await transporter.sendMail(mailOptions);
  console.log(`OTP sent to ${email}`);
};

exports.verifyOtp = async (email, otp) => {
  //search with post otp
  const otpEntry = await Otp.findOne({ email: email, otp: otp });
  //delete found otp in database
  if (otpEntry) {
    await Otp.deleteOne({ _id: otpEntry._id });
    return true;
  }

  return false;
};

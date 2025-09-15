const otpService = require("../services/otp-service");

exports.sendEmailOtp = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res
      .status(400)
      .json({ success: false, message: "Email is required." });
  }

  try {
    await otpService.generateAndSendEmailOtp(email);
    res
      .status(200)
      .json({ success: true, message: "OTP sent successfully to your email." });
  } catch (error) {
    console.error("Error sending email OTP:", error);
    res
      .status(500)
      .json({
        success: false,
        message: "Failed to send OTP. Please try again later.",
      });
  }
};

exports.verifyOtp = async (req, res) => {
  const { email, otp } = req.body;
  console.log(email, otp);

  if (!email || !otp) {
    return res
      .status(400)
      .json({ success: false, message: "Email and OTP are required." });
  }

  try {
    const isValid = await otpService.verifyOtp(email, otp);
    if (isValid) {
      res
        .status(200)
        .json({ success: true, message: "OTP verified successfully." });
    } else {
      res
        .status(400)
        .json({ success: false, message: "Invalid or expired OTP." });
    }
  } catch (error) {
    console.error("Error verifying OTP:", error);
    res
      .status(500)
      .json({
        success: false,
        message: "An error occurred during OTP verification.",
      });
  }
};

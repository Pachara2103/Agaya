const jwt = require("jsonwebtoken");

// เอาพวกใช้ซ้ำมา คือ Token กับตัว valid password ที่ใช้บ่อย

exports.sendTokenResponse = (user, statusCode, res) => {
  const token = user.getSignedJwtToken();
  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === "production") {
    options.secure = true;
  }
  res
    .status(statusCode)
    .cookie("token", token, options)
    .json({ success: true, token });
};

exports.validatePassword = (password) => {
  const errors = [];
  if (password.length < 8) errors.push("must be at least 8 characters long");
  if (!/[a-z]/.test(password)) errors.push("must include a lowercase letter");
  if (!/[A-Z]/.test(password)) errors.push("must include an uppercase letter");
  if (!/[0-9]/.test(password)) errors.push("must include a number");
  // if (!/[@$!%*?&]/.test(password)) errors.push("must include a special character");
  return errors;
};

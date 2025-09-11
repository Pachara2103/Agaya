const User = require("../models/user");
const bcrypt = require('bcryptjs');

function validatePassword(password) {
  const errors = [];
  if (password.length < 8) errors.push("must be at least 8 characters long");
  if (!/[a-z]/.test(password)) errors.push("must include a lowercase letter");
  if (!/[A-Z]/.test(password)) errors.push("must include an uppercase letter");
  if (!/[0-9]/.test(password)) errors.push("must include a number");
  if (!/[@$!%*?&]/.test(password)) errors.push("must include a special character");
  return errors;
}

//@desc Register user
//@route POST /register
//@access Public
exports.register = async (req, res, next) => {
  const {
    username,
    password,
    phoneNumber,
    email,
    userType,
    dateOfBirth,
  } = req.body;

  const errors = validatePassword(password);
  if (errors.length > 0) {
    return res.status(400).json({success: false, message: "Password " + errors.join(", ")});
  }

  try {
    const query = [];
    if (email) query.push({email});
    if (phoneNumber) query.push({phoneNumber});

    const existingUser = await User.findOne({$or: query});

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email or phone number already registered"
      });
    }

    const user = await User.create({
      username,
      password,
      phoneNumber,
      email,
      userType,
      dateOfBirth,
    });
    
    res.status(200).json({success: true, message: "Register successfully"});
  } catch (err) {
    console.error(err);

    if (err.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: Object.values(err.errors).map(e => e.message).join(", ")
      });
    }

    if (err.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Duplicate field value entered"
      });
    }

    return res.status(500).json({
      success: false,
      message: "Server error"
    });
  }

  //then creat jwt token & save to cookies
  // const token = user.getSignedJwtToken();
  // res.status(200).json({success: true, token});
  sendTokenResponse(user, 200, res);
  try {
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({success: false, message: err.message});
    }
    if (err.code === 11000) { //duplicate username, email
      return res.status(400).json({success: false, message: 'Username or email already exists'});
    }
    return res.status(400).json({ success: false });
  }
}

exports.updatePassword = async (req, res) => {
  try {
    const {oldPassword, newPassword} = req.body;

    const errors = validatePassword(newPassword);
    if (errors.length > 0) {
      return res.status(400).json({success: false, message: "Password " + errors.join(", ")});
    }
    
    const user = await User.findById(req.user.id).select('+password');

    if (!user || !user.password) {
      return res.status(400).json({success: false, message: 'User not found'});
    }

    //check old password
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({success: false, message: 'Old password is incorrect'});
    }

    user.password = newPassword;
    await user.save();

    res.status(200).json({success: true, message: 'Password updated successfully'});
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({success: false, message: err.message});
    }
    console.error(err.message);
    res.status(500).json({success: false, message: 'Server error'});
  }
}

//Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
  //Create token
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE*24*60*60*1000),
    httpOnly: true
  };

  if (process.env.NODE_ENV === 'production') {
    options.secure = true;
  }

  res.status(statusCode).cookie('token', token, options).json({
    success: true,
    token
  });
};
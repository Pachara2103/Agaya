const User = require("../models/user");

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
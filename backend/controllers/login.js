const User = require("../models/user");

//@desc Register user
//@route POST /api/v1/Agaya/login
//@access Public
exports.login = async (req, res, next) => {
  const { loginId, password } = req.body; //loginId is either email or phone number

  if (!loginId || !password) {
    return res.status(400).json({success: false, message: "Please provide an valid email or phone number and password"});
  }

  try {
    const user = await User.findOne({
      $or: [{email: loginId}, {phoneNumber: loginId}]
    }).select('+password');

    if (!user) {
      return res.status(400).json({success: false,message: "Invalid credentials (user)"});
    }

    //then validate the password
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res .status(401).json({success: false, message: 'Invalid credential (password)'});
    }

    // Create token
    // const token = user.getSignedJwtToken();
    // res.status(200).json({success: true, token});
    sendTokenResponse(user, 200, res);
  } catch (err) {
    console.log("error", err);
    return res.status(400).json({success: false, message: "Server error"});
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

  res.status(statusCode).cookie('token', token, options).json({success: true, token});
}

//@desc Get current logged in user
//@route POST /api/v1/Agaya/me
//@access Private
exports.getMe = async(req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({success: true,data: user});
}

exports.googleCallback = (req, res) => {
  const user = req.user;
  sendTokenResponse(user, 200, res);

  // In case you want to redirect to frontend instead of sending JSON
  // const token = req.user.getSignedJwtToken();
  // res.cookie('token', token, {httpOnly: true});
  // res.redirect('/dashboard');
};
const User = require("../models/User");
//@desc Register user
//@route POST /api/v1/Agaya/login
//@access Public
exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, msg: "Please provide an email and password" });
  }

  try {
    const user = await User.findOne({email: email}).select('+password');

    if (!user) {
      return res
        .status(400)
        .json({success: false, msg: "Invalid credentials"});
    }

    //then validate the password
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res 
        .status(401)
        .json({success: false, msg: 'Invalid credential'});
    }

    // Create token
    // const token = user.getSignedJwtToken();
    // res.status(200).json({success: true, token});
    sendTokenResponse(user, 200, res);
  } catch (err) {
    console.log("error", err);
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
}

//@desc Get current logged in user
//@route POST /api/v1/Agaya/me
//@access Private
exports.getMe = async(req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({
    success: true,
    data: user
  });
}
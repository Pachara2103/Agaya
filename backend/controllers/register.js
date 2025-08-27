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
    address,
    birth_date,
  } = req.body;

  const user = await User.create({
    username,
    password,
    phoneNumber,
    email,
    userType,
    address,
    birth_date,
  });

  //then creat jwt token & save to cookies
  // const token = user.getSignedJwtToken();
  // res.status(200).json({success: true, token});
  sendTokenResponse(user, 200, res);
  try {
  } catch (err) {
    console.log("error", err);
    return res.status(400).json({ success: false });
  }
};
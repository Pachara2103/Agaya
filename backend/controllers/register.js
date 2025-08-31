const User = require("../models/user");
//@desc Register user
//@route POST /register
//@access Public
exports.register = async (req, res, next) => {
  const {
    username,
    password,
    phone_number,
    email,
    usertype,
    address,
    birth_date,
  } = req.body;

  const user = await User.create({
    username,
    password,
    phone_number,
    email,
    usertype,
    address,
    birth_date,
  });

  //then creat jwt token & save to cookies
  try {
  } catch (err) {
    console.log("error", err);
    return res.status(400).json({ success: false });
  }
};
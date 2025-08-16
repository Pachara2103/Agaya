const User = require("../models/User");
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

//@desc Register user
//@route POST /login
//@access Public
exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, msg: "Please provide an email and password" });
  }

  try {
    const user = await User.findOne({ email: email });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, msg: "Invalid credentials" });
    }

    //then validate the password


  } catch (err) {
    console.log("error", err);
    return res.status(400).json({ success: false });
  }
};

const User = require("../models/user");
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
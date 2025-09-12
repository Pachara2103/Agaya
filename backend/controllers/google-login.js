const User = require("../models/user");

exports.googleCallback = (req, res) => {
  const user = req.user;
  sendTokenResponse(user, 200, res);

  // In case you want to redirect to frontend instead of sending JSON
  // const token = req.user.getSignedJwtToken();
  // res.cookie('token', token, {httpOnly: true});
  // res.redirect('/dashboard');
};
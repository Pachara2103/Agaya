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

exports.changePassword = async (req, res) => {
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
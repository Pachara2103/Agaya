const authService = require("../services/auth-service");
const { sendTokenResponse } = require("../utils/authUtils");

// @desc    Register user
// @route   POST /api/v1/agaya/auth/register
exports.register = async (req, res, next) => {
  try {
    const user = await authService.register(req.body);
    sendTokenResponse(user, 201, res); // 201 Created
  } catch (error) {
    next(error);
  }
};

// @desc    Login user
// @route   POST /api/v1/agaya/auth/login
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await authService.login(email, password);
    sendTokenResponse(user, 200, res);
  } catch (error) {
    next(error);
  }
};

// @desc    Log user out
// @route   GET /api/v1/agaya/auth/logout
exports.logout = async (req, res, next) => {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    await authService.logout(token);

    res.clearCookie("token");
    res.status(200).json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    next(error);
  }
};

// @desc    Change password
// @route   PUT /api/v1/agaya/auth/change-password
exports.changePassword = async (req, res, next) => {
  try {
    const { oldPassword, newPassword } = req.body;
    await authService.changePassword(req.user.id, oldPassword, newPassword);
    res
      .status(200)
      .json({ success: true, message: "Password updated successfully" });
  } catch (error) {
    next(error);
  }
};

// @desc    Change password
// @route   POST /api/v1/agaya/auth/forgot-password
exports.forgotPassword = async (req, res, next) => {
  try {
    const { email, newPassword } = req.body;
    await authService.forgotPassword(email, newPassword);
    res.status(200).json({ success: true, message: "Password reset success" });
  } catch (error) {
    next(error);
  }
};

// @desc    Google OAuth Callback
// @route   GET /api/v1/agaya/auth/google/callback
exports.googleCallback = (req, res) => {
  // req.user is populated by Passport.js after successful authentication
  sendTokenResponse(req.user, 200, res);
};

// @desc    Get current logged-in user
// @route   GET /api/v1/agaya/auth/me
exports.getMe = (req, res, next) => {
  // The user object is attached to the request by the 'protect' middleware
  res.status(200).json({ success: true, data: req.user });
};

// @desc    Update current user profile
// @route   PUT /api/v1/agaya/auth/me
// @access  Private
exports.updateMe = async (req, res, next) => {
  try {
    const { username, phoneNumber, dateOfBirth, gender, profileImageUrl } = req.body;
    // มันมีใน user-routes เหมือนกันแต่เลือกใช้อันใหม่ดีกว่า ให้มันอยู่ด้วยกันแล้วค่อยจัดการที่เหลือจะดีกว่า
    // เดะไว้ refactor แยก controller กับ service อีกที
    const updatedFields = {
      username,
      phoneNumber,
      dateOfBirth,
      gender,
      profileImageUrl
    };

    const user = await User.findByIdAndUpdate(req.user.id, updatedFields, {
      new: true, 
      runValidators: true 
    });

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};


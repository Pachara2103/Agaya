const authService = require("../services/auth-service");
const { sendTokenResponse } = require("../utils/authUtils");

// @desc    Register user
// @route   POST /api/v1/agaya/auth/register
// @access  Public
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
// @access  Public
exports.login = async (req, res, next) => {
  try {
    const user = await authService.login(req.body);
    sendTokenResponse(user, 200, res);
  } catch (error) {
    next(error);
  }
};

// @desc    Log user out
// @route   GET /api/v1/agaya/auth/logout
// @access  Private
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
// @access  Private
exports.changePassword = async (req, res, next) => {
  try {
    await authService.changePassword(req.user.id, req.body);
    res.status(200).json({ success: true, message: "Password updated successfully" });
  } catch (error) {
    next(error);
  }
};

// @desc    Forgot password
// @route   POST /api/v1/agaya/auth/forgot-password
// @access  Private
exports.forgotPassword = async (req, res, next) => {
  try {
    await authService.forgotPassword(req.body);
    res.status(200).json({ success: true, message: "Password reset successfully" });
  } catch (error) {
    next(error);
  }
};

// @desc    Google OAuth Callback
// @route   GET /api/v1/agaya/auth/google/callback
// @access  Public
exports.googleCallback = (req, res) => {
  const token = req.user.getSignedJwtToken(); 
  const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173'; 
  
  res.status(200).redirect(`${frontendUrl}/auth/google/callback?token=${token}`);
};

// @desc    Get current logged-in user
// @route   GET /api/v1/agaya/auth/me
// @access  Private
exports.getMe = (req, res, next) => {
  // The user object is attached to the request by the 'protect' middleware
  res.status(200).json({ success: true, data: req.user });
};

// @desc    Update current user profile
// @route   PUT /api/v1/agaya/auth/me
// @access  Private
exports.updateMe = async (req, res, next) => {
  try {
    const user = await authService.updateProfile(req.user.id, req.body);
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};


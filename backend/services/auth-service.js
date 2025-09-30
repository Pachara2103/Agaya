const User = require("../models/user");
const TokenBlacklist = require("../models/token-blacklist");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validatePassword } = require("../utils/authUtils");
const createError = require("http-errors");

exports.register = async (userData) => {
  const { password, email } = userData;

  // Check for existing user by email
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw createError(409, "This email is already registered.");
  }

  // from utils that we will reuse
  const errors = validatePassword(password);
  if (errors.length > 0) {
    throw createError(400, "Password validation failed: " + errors.join(", "));
  }

  /* 
        ตรงนี้พอสร้างจริงอาจต้องมากัน userType: ["customer"]
        admin อาจต้องไปกดสร้างใน database เอง
        ตอนนี้ยังไม่ได้แก้สามารถสร้างได้ปกติ
    */
  const user = await User.create(userData);
  return user;
};

exports.login = async (userData) => {
  const { email, password} = userData
  if (!email || !password) {
    throw createError(400, "Please provide an email and password.");
  }
  // Find user by email and include the password field for comparison
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw createError(401, "Invalid credentialssssssss.");
  }

  // Use the model's method to compare passwords
  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    throw createError(401, "Invalid credentials.");
  }

  return user;
};

exports.logout = async (token) => {
  if (!token) {
    throw createError(400, "No token found to invalidate.");
  }
  const decoded = jwt.decode(token);
  // Use token's expiration date for the blacklist entry's TTL
  const expiresAt = new Date(decoded.exp * 1000);
  await TokenBlacklist.create({ token, expiresAt });
};

exports.changePassword = async (userId, oldPassword, newPassword) => {
  // Validate the new password
  const errors = validatePassword(newPassword);
  if (errors.length > 0) {
    throw createError(
      400,
      "New password validation failed: " + errors.join(", ")
    );
  }

  const user = await User.findById(userId).select("+password");
  if (!user) {
    throw createError(404, "User not found.");
  }

  // Check if the old password is correct
  const isMatch = await bcrypt.compare(oldPassword, user.password);
  if (!isMatch) {
    throw createError(404, "Old password is incorrect.");
  }

  // Set the new password (hashing is handled by 'pre-save' hook)
  user.password = newPassword;
  await user.save();
};

exports.forgotPassword = async (email, newPassword) => {
  // Validate the new password
  const errors = validatePassword(newPassword);
  if (errors.length > 0) {
    throw createError(
      400,
      "New password validation failed: " + errors.join(", ")
    );
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw createError(404, "User not found.");
  }

  // Set the new password (hashing is handled by 'pre-save' hook)
  user.password = newPassword;
  await user.save();
};

exports.updateProfile = async (userId, userData) => {
  const allowFields = ["username", "phoneNumber", "dateOfBirth", "gender", "profileImageUrl"]
  const updatedFields = {}

  for (const field of allowFields) {
    if (!userData[field] !== undefined) {
      updatedFields[field] = userData[field]
      // it will make change only there is some data
    }
  }

  const user = await User.findByIdAndUpdate(userId, updatedFields, {
    new: true, // Return the modified document
    runValidators: true, // Ensure schema validations are run
  });

  if (!user) {
    throw createError(404, "User not found.");
  }

  return user;
};

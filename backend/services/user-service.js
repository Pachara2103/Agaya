const User = require("../models/user");
const Vendor = require("../models/vendor");
const createError = require("http-errors");
const bcrypt = require("bcryptjs");
const vendor = require("../models/vendor");

exports.findAll = async () => {
  const users = await User.find();
  return users;
};

exports.findById = async (id) => {
  const user = await User.findById(id);
  if (!user) {
    throw createError(404, "User not found");
  }
  return user;
};

exports.findByEmail = async (email) => {
  const user = await User.find({ email: email });
  if (!user) {
    throw createError(404, "User not found");
  }
  return user;
};

exports.update = async (id, updateData) => {
  const user = await User.findById(id);
  if (!user) throw createError(404, "User not found");

  const tmp = [
    "username",
    "password",
    "phoneNumber",
    "email",
    "userType",
    "dateOfBirth",
  ];
  const dataToUpdate = {};
  let isUpdated = false;

  for (const x of tmp) {
    if (updateData[x]) {
      if (x === "password") {
        const isSame = await bcrypt.compare(updateData.password, user.password);
        if (!isSame) {
          const salt = await bcrypt.genSalt(10);
          dataToUpdate.password = await bcrypt.hash(updateData.password, salt);
          isUpdated = true;
        }
      } else {
        if (user[x] !== updateData[x]) {
          dataToUpdate[x] = updateData[x];
          isUpdated = true;
        }
      }
    }
  }

  // send 200
  if (!isUpdated) {
    return user;
  }

  const updatedUser = await User.findByIdAndUpdate(id, dataToUpdate, {
    new: true,
    runValidators: true,
  });

  if (!updatedUser) throw createError(404, "User not found");
  return updatedUser;
};

exports.deleteUser = async (id) => {
  const user = await User.findByIdAndDelete(id);
  if (!user) {
    throw createError(404, "User not found");
  }
  return;
};

exports.getVendorId = async (userId) => {
  const vendor = await Vendor.findOne({ userId });
  // console.log("Looking for vendor with user ID:", userId);
  // console.log("Vendor found:", vendor);
  if (!vendor) {
    throw createError(404, "User not found or is not a vendor");
  }
  console.log("Vendor ID found:", vendor._id);
  return vendor._id;
};

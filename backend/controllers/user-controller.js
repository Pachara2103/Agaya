const User = require("../models/User");
const createError = require("http-errors");

const findAll = async (req, res) => {
  const users = await User.find();
  return res.status(200).json(users);
}

const create = async (req, res) => {
  const {
    username,
    password,
    phoneNumber,
    email,
    userType,
    address,
    dateOfBirth,
  } = req.body;
  const existingUser = await User.findOne({ username: username });
  if (existingUser) throw createError(400, `Username has been used`);

  const newUser = await User.create({
    username,
    password,
    phoneNumber,
    email,
    userType,
    address,
    dateOfBirth,
  })
  return res.status(201).json(newUser);
}
const update = async (req, res) => {
  const id = req.params.id;
  const {
    username,
    password,
    phoneNumber,
    email,
    userType,
    address,
    dateOfBirth,
  } = req.body;
  let isUpdated = false;
  const user = await User.findById(id);
  if (!user) throw createError(400, `User does not exist`);
  const updatedData = {};

  if(username && user.username !== username) {
    updatedData.username = username;
    isUpdated = true;
  }

  if(password && user.password !== password) {
    updatedData.password = password;
    isUpdated = true;
  }

  if(phoneNumber && user.phoneNumber !== phoneNumber) {
    updatedData.phoneNumber = phoneNumber;
    isUpdated = true;
  }

  if(email && user.email !== email) {
    updatedData.email = email;
    isUpdated = true;
  }

  if(userType && user.userType !== userType) {
    updatedData.userType = userType;
    isUpdated = true;
  }

  if(address && user.address !== address) {
    updatedData.address = address;
    isUpdated = true;
  }

  if(dateOfBirth && user.dateOfBirth !== dateOfBirth) {
    updatedData.dateOfBirth = dateOfBirth;
    isUpdated = true;
  }

  if (!isUpdated) throw createError(400, "Does not have any different data.");
  const updatedUser = await User.findByIdAndUpdate(id, updatedData, {new : true});
  
  return res.status(200).json(updatedUser);
}

const deleteUser = async (req, res) => {
  const id = req.params.id;
  const user = await User.findByIdAndDelete(id);
  return res.status(200).json(user);
  
}


//CRUD

module.exports = {findAll, create, update, deleteUser};
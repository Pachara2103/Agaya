const User = require("../models/user");

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
  if (existingUser) throw createError(409, `Username has been used`);

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

//CRUD

module.exports = {findAll, create};
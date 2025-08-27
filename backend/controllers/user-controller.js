const User = require("../models/user");
const createError = require("http-errors");

const findAll = async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json(users);

  }
  catch (err) {
    res.status(400).json({msg: err.message})
  }
}

const create = async (req, res) => {
  try {
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
    if (existingUser) res.status(400).json({message:"user has been used"});
  
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
  } catch (err) {
    res.status(400).json({msg: err.message})
  }
}
const update = async (req, res) => {
  try {
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
    if (!user) res.status(400).json({message:"user not found"});
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
  
    // if (!isUpdated) throw createError(400, "Does not have any different data.");
    if (!isUpdated) return res.status(400).json({message:"Does not have any different data."});
    const updatedUser = await User.findByIdAndUpdate(id, updatedData, {new : true});
    
    return res.status(200).json(updatedUser);
  } catch (err) {
    res.status(400).json({msg: err.message})
  }
}

const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findByIdAndDelete(id);
    if(!user) return res.status(400).json({message:"user not found"});
    return res.status(200).json(user);
  }  catch (err) {
    res.status(400).json({msg: err.message})
  }
}


//CRUD

module.exports = {findAll, create, update, deleteUser};
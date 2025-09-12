const User = require("../models/user");
const createError = require("http-errors");

// ใช้ exports แทน
// กัน role admin
// @desc    Get all users (Admin)
// ปรับจากของแบ้งนิดน่อย แค่ใส่พวก success เข้าไป
exports.findAll = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({ success: true, count: users.length, data: users });
    } catch (err) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

// ลบ create เนื่องจากมี register ไปอยู่กับ auth เลยน่าจะดีกว่า

// @desc    Get single user by ID (Admin)
exports.findById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        res.status(200).json({ success: true, data: user });
    } catch (err) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
};


exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    const {
      username,
      password,
      phoneNumber,
      email,
      userType,
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
  
    if(dateOfBirth && user.dateOfBirth !== dateOfBirth) {
      updatedData.dateOfBirth = dateOfBirth;
      isUpdated = true;
    }
  
    // if (!isUpdated) throw createError(400, "Does not have any different data.");
    if (!isUpdated) return res.status(400).json({message:"Does not have any different data."});
    const updatedUser = await User.findByIdAndUpdate(id, updatedData, {new : true});
    
    return res.status(200).json(updatedUser);
  } catch (err) {
    res.status(400).json({message: err.message})
  }
}

// @desc    Delete a user (Admin)
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        res.status(200).json({ success: true, message: "User deleted successfully" });
    } catch (err) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

//CRUD

// module.exports = {findAll, create, update, deleteUser};
// ใช้ exports แทน module.exports
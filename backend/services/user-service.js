const User = require("../models/user");
const createError = require("http-errors");

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

exports.update = async (id, updateData) => {
    if (updateData.password) {
        /* 
            ไม่ hash จะเป็นงี้
            ex. oldpassword = 1234 hash แล้วได้ 1243c13@#%@^V%@FRSDSFA
            พอเปลี่ยน newpassword = 1234 มันทะลุเป็น 1234 เลย
        */
        const salt = await bcrypt.genSalt(10);
        updateData.password = await bcrypt.hash(updateData.password, salt);
    }

    // check ของเดิมที่เช็ค 400 ข้อมูลไม่มีการเปลี่ยนแปลงเหมือนไม่ค่อยมีคนทำ
    const updatedUser = await User.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true, 
    });

    if (!updatedUser) {
        throw createError(404, "User not found");
    }
    return updatedUser;
};

exports.deleteUser = async (id) => {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
        throw createError(404, "User not found");
    }
    return;
};
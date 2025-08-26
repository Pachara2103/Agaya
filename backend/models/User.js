const mongoose = require('mongoose');
const bcrypts = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  // uid: {
  //   type: String,
  //   required: true,
  //   unique: true,
  //   maxlength: 100
  // },
  username: {
    type: String,
    required: true,
    maxlength: 72
  },
  password: {
    type: String,
    required: true,
    maxlength: 72
  },
  phoneNumber: {
    type: String,
    required: true,
    match: /^[0-9]{10}$/ // ตรวจสอบว่าเป็นเลข 10 หลัก
  },
  email: {
    type: String,
    required: true,
    maxlength: 72,
    match: /^\S+@\S+\.\S+$/ // ตรวจสอบรูปแบบ email
  },
  userType: {
    type: String,
    required: true,
    maxlength: 10,
  },
  address: {
    type: String,
    required: true,
    maxlength: 255
  },
  dateOfBirth: {
    type: Date,
    required: true,
    default: Date.now()
  }
}, {
  timestamps: true
});

//Encrypt password using bcrypt
userSchema.pre('save', async function(next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

//Sign JWT and return
userSchema.methods.getSignedJwtToken = function() {
  return jwt.sign({id:this._id}, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  });
}

module.exports = mongoose.model('User', userSchema);

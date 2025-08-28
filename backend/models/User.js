const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  /* 
    username field change to not require can modify or add later
    user need to register either email or phone
  */
  username: {
    type: String,
    maxlength: 72
  },
  password: {
    type: String,
    required: true,
    maxlength: 72
  },
  // phone is unique
  phoneNumber: {
    type: String,
    unique: true,
    trim: true,
    sparse: true,
    match: /^[0-9]{10}$/ // ตรวจสอบว่าเป็นเลข 10 หลัก
  },
  email: {
    type: String,
    unique: true,
    trim: true,
    sparse: true,
    lowercase: true,
    maxlength: 72,
    match: /^\S+@\S+\.\S+$/ // ตรวจสอบรูปแบบ email
  },
  /*
    change to enum and make it array user can have more than 1 role
  */
  userType: {
    type: [String],
    enum: ['customer', 'vendor', 'admin'],
    default: ['customer'],
    required: true,
  },
  /*
    address have to create new model schema 
    some people have more than 1 address
    and it might have different name on that address
    dont want to create nested array 
  */
  // address: {
  //   type: String,
  //   required: true,
  //   maxlength: 255
  // },
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
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

//Sign JWT and return
userSchema.methods.getSignedJwtToken = function() {
  return jwt.sign({id:this._id}, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  });
}

//Match user entered password to hashed password in database (log in)
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
}

module.exports = mongoose.models.user || mongoose.model('user', userSchema);

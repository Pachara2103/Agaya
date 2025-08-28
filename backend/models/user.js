const mongoose = require('mongoose');

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
    required: true
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
  // this on can modify later
  dateOfBirth: {
    type: Date,
    required: true,
    default: Date.now()
  }
}, {
  timestamps: true
});

// check email or phoneNumber at least 1 exist 
userSchema.pre('validate', function(next) {
  if (!this.email && !this.phoneNumber) {
    this.invalidate('email', 'Email or Phone number must exist');
  }
  next();
});

module.exports = mongoose.model('User', userSchema);

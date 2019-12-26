const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username:{
    type:String,
    required:true,
    min:3,
    max:255
  },
  email: {
    type:String,
    required:true,
    min:4,
    max:255
  },
  password: {
    type:String,
    required:true,
    min:12,
    max:1024
  },
  registeredDate: {
    type:Date,
    default:Date.now
  }
});

module.exports = mongoose.model('User', userSchema);
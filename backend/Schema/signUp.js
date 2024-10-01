const mongoose = require('mongoose');

const signUpSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true,
      unique:true
    },
    password: {
      type: String,
      required: true,
    },
    courses: {
      type: [String],
    },
    dates:{
      type: [Date],
      default:[],
    }
  });
  const signUp = mongoose.model("SignUp_Info", signUpSchema);

  module.exports = signUp;
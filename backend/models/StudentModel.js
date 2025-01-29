const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  rollNumber: {
    type: String,
    required: true,
    unique: true, // Roll number should be unique for each student
  },
  email: {
    type: String,
    required: true,
    unique: true, // Email should also be unique
  },
  type:{
    type:String,
    required: true
  },
  department: {
    type: String,
    required: true,
  },
  batch: {
    type: String,
    required: true,
  },
  interestDomain: {
    type: String,
  },
  percentile: {
    type: Number,
  },
  password: {
    type: String,
    required: true, // Password is required for manual registration, not needed for Google auth users
  },
  isGoogleUser: {
    type: Boolean,
    default: false, // For Google Auth users, this will be true
  },
  googleId: {
    type: String, // Store Google ID if the user logs in with Google Auth
    required: function () {
      return this.isGoogleUser;
    },
  },
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;

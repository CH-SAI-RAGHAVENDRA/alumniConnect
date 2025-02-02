const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  rollNo: {
    type: String,
    unique: true,
    required: function() {
      return !this.isGoogleUser;
    }, 
  },
  email: {
    type: String,
    required: true,
    unique: true, // Email should also be unique
  },
  department:{
    type:String,
    required: function() {
      return !this.isGoogleUser;
    },
  },
  domain: {
    type: String,
    required: function() {
      return !this.isGoogleUser;
    },
  },
  year: {
    type: String,
    required: function() {
      return !this.isGoogleUser;
    },
  },
  percentile: {
    type: String,
    required: function() {
      return !this.isGoogleUser;
    },
  },
  type: {
    type: String,
    required: function() {
      return !this.isGoogleUser;
    },
  },
  password: {
    type: String, // Password is required only for manual registration
    required: function() {
      return !this.isGoogleUser;
    },
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

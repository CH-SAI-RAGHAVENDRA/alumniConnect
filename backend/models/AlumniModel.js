const mongoose = require('mongoose');

const AlumniSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  rollNo: {
    type: String,
    unique: false,
    required: function() {
      return !this.isGoogleUser;
    }, // For manual registrations, rollNumber can be optional for Google users
  },
  email: {
    type: String,
    required: true,
    unique: true, // Email should be unique
  },
  department: {
    type: String,
    required: function() {
      return !this.isGoogleUser;
    }, // Might not be available for Google users
  },
  passYear: {
    type: String,
    required: function() {
      return !this.isGoogleUser;
    }, // Might not be available for Google users
  },
  position: {
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
  type:{
    type:String,
  },
  password: {
    type: String, // Password is required only for manual registration
    required: function() {
      return !this.isGoogleUser;
    },
  },
  isGoogleUser: {
    type: Boolean, // Indicates if the user registered using Google Auth
    default: false,
  },
  googleId: {
    type: String, // Google-provided ID for users logging in via Google
    required: function() {
      return this.isGoogleUser;
    },
  },
});

const Alumni = mongoose.model('Alumni', AlumniSchema);

module.exports = Alumni;

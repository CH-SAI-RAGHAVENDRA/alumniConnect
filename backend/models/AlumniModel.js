const mongoose = require('mongoose');

const AlumniSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  rollNumber: {
    type: String,
    unique: false, // For manual registrations, rollNumber can be optional for Google users
  },
  email: {
    type: String,
    required: true,
    unique: true, // Email should be unique
  },
  department: {
    type: String,
    required: false, // Might not be available for Google users
  },
  passOutYear: {
    type: String,
    required: false, // Might not be available for Google users
  },
  companyAndPosition: {
    type: String,
    required: false,
  },
  percentile: {
    type: Number,
    required: false,
  },
  type:{
    type:String,
    required: true
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

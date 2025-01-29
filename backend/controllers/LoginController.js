const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Alumni = require('../models/AlumniModel'); // For Alumni model
const Student = require('../models/StudentModel'); // For Student model
const dotenv = require('dotenv');
dotenv.config();

// Secret key for JWT (in a real app, store this in an environment variable)
const JWT_SECRET_KEY = process.env.JWT_SECRET;

// Login function (without userType)
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user in both Alumni and Student models
    let user = await Alumni.findOne({ email });
    if (!user) {
      user = await Student.findOne({ email });
    }

    // If user not found in both models
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Compare the password (hashed)
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Create JWT token
    const payload = {
      userId: user._id,
      email: user.email,
    };

    const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: '1h' }); // Token expires in 1 hour

    // Send the response with token
    res.status(200).json({
      message: 'Login successful',
      token, // Send token in the response
      user: {
        name: user.name,
        email: user.email,
        type: user.type
      },
    });
    console.log(res.data);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { login };

// controllers/authController.js
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const Alumni = require('../models/AlumniModel'); // Your MongoDB model for alumni/student
const dotenv = require('dotenv');
const Student = require('../models/StudentModel');

dotenv.config();

// Initialize the Google OAuth client
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Google login handler function
const googleLogin = async (req, res) => {
    const { token, type } = req.body;

    try {
        // Verify the Google token
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();
        const googleId = payload.sub;

        // Check if the user exists
        let user = await Alumni.findOne({ googleId });

        // If user does not exist, return an error
        if (!user) {
            user = await Student.findOne({ googleId });
        }
        if (!user) {
            return res.status(404).json({ message: 'User not found Please Register' });
        }

        // Generate JWT token
        const jwtToken = jwt.sign({ userId: user._id, type: user.type }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Respond with the JWT token and user info
        res.json({ token: jwtToken, user });
    } catch (err) {
        console.error('Error during Google login:', err);
        res.status(500).json({ error: 'Server error during login' });
    }
};

module.exports = { googleLogin };

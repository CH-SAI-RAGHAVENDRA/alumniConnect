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
const googleRegister = async (req, res) => {
    const { token, type } = req.body;

    try {
        // Verify the Google token
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        console.log(type);
        const payload = ticket.getPayload();
        const googleId = payload.sub;

        // Check if the user exists in the database
        
        user = await Alumni.findOne({ googleId });
        if(user){
            return res.json({ message: 'User already exists' });  }
                
        user = await Student.findOne({ googleId });
        if(user){
            return res.json({ message: 'User already exists' });  }
        
        console.log('User:', user);
        // If user does not exist, create a new user
        if (!user && type === 'alumni') {
            user = new Alumni({
                googleId: googleId,
                fullName: payload.name,
                email: payload.email,
                type: type,
                isGoogleUser: true
            });
            await user.save();
        }
        else{
            user = new Student({
                googleId: googleId,
                fullName: payload.name,
                email: payload.email,
                type: type,
                isGoogleUser: true
            });
            await user.save();
        }
        console.log('User after save:', user);
        // Generate JWT token to maintain user session
        const jwtToken = jwt.sign({ userId: user._id, type: user.type }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Respond with the JWT token and user info
        res.json({ token: jwtToken, user });
    } catch (err) {
        console.error('Error during Google login:', err);
        res.status(500).json({ error: 'Server error during login' });
    }
};

module.exports = { googleRegister };

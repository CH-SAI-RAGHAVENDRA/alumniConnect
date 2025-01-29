const express = require('express');
const router = express.Router();
const { registerStudent } = require('../controllers/RegisterStudent');

// Route for registering a student
router.post('/register', registerStudent);

module.exports = router;

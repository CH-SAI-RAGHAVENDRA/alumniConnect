const express = require('express');
const router = express.Router();
const {login} = require('../controllers/LoginController.js');
const { googleLogin} = require('../controllers/googleLogin.js');
const { googleRegister } = require('../controllers/googleRegister.js');
// Login route
router.post('/login', login);

module.exports = router;

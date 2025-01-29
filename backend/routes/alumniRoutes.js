const express = require('express');
const router = express.Router();
const { registerAlumni } = require('../controllers/RegisterAlumni');

router.post('/register', registerAlumni);


module.exports = router;

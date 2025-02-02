const express = require('express');
const router = express.Router();
const { registerAlumni } = require('../controllers/RegisterAlumni');
const Alumni = require('../models/AlumniModel');

router.post('/register', registerAlumni);

router.get('/register', async (req, res) => {
    try{
        const data = await Alumni.find({});
        res.json(data);
    }
    catch(err){
        console.error(err.message);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;

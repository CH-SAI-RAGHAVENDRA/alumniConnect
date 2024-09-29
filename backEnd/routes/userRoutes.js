// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Create a new user
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  // try {
  //   const user = new User({ name, email, password });
  //   await user.save();
  //   res.status(201).json(user);
  // } catch (error) {
  //   res.status(400).json({ message: error.message });
  // }
  User.findOne({email:email}).then((user)=>{
    if(user){
      res.json("exists");
    }
    else{
      try {
        const user = new User({ name, email, password });
         user.save();
        res.status(201).json(user);
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
    }
  })
});

router.post('/login', async(req,res) => {
  const {email, password} = req.body;
  User.findOne({email:email})
  .then((user)=>{
    if(user){
    if(user.password == password){
      console.log(password, user.password)
       res.json('Success');
    }
    else{
      console.log(password, user.password)
      res.json("password was wrong");
    }}
    else{
      res.json("user not found please Login");
    }
  })
})

// Get all users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a user by ID
router.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a user
router.put('/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a user
router.delete('/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

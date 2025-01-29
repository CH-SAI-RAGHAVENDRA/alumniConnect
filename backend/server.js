const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const alumniRoutes = require('./routes/alumniRoutes');
const studentRoutes = require('./routes/studentRoutes');
const authRoutes = require('./routes/authRoutes')

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.get('/',(req, res)=>{
    res.send({message:"Hellow World"})
})
app.use('/api/auth', authRoutes); 
app.use('/api/alumni', alumniRoutes);  // Route for alumni registration
app.use('/api/students', studentRoutes); 

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

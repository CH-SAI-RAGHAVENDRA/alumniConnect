const bcrypt = require('bcryptjs');
const Alumni = require('../models/AlumniModel'); // Import the Alumni model
const Student = require('../models/StudentModel'); // Import the Student model

const registerAlumni = async (req, res) => {
  const {
    fullName,
    rollNo,
    email,
    department,
    position,
    passYear,
    percentile,
    password,
  } = req.body;

  try {
    // Check if alumni already exists
    let EmailExists = await Alumni.findOne({ email });
    let RollNoExists = await Alumni.findOne({ rollNo });
    if (EmailExists||RollNoExists) {
      return res.status(400).json({ message: 'email or rollnumber already exists' });
    }
    EmailExists = await Student.findOne({ email });
    if (EmailExists) {
      return res.status(400).json({ message: 'email or rollnumber already exists' });
    }
    console.log(req.body);
    // Hash the password for manual registration
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new alumni record
    const newAlumni = new Alumni({
      fullName,
      rollNo,
      email,
      department,
      position,
      passYear,
      percentile,
      password :hashedPassword,
      type:'alumni'
    });

    // Save the new alumni to the database
    await newAlumni.save();

    res.status(201).json({ message: 'Alumni registered successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { registerAlumni };

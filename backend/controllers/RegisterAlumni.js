const bcrypt = require('bcryptjs');
const Alumni = require('../models/AlumniModel'); // Import the Alumni model

const registerAlumni = async (req, res) => {
  const { name, email, password, rollnumber, Dept, passOutyear, CompanyAndPostion, percentile } = req.body;

  try {
    // Check if alumni already exists
    const alumniExists = await Alumni.findOne({ email });
    if (alumniExists) {
      return res.status(400).json({ message: 'Alumni already exists' });
    }

    // Hash the password for manual registration
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new alumni record
    const newAlumni = new Alumni({
      name,
      email,
      password: hashedPassword,
      rollnumber,
      Dept,
      passOutyear,
      CompanyAndPostion,
      percentile,
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

const bcrypt = require('bcryptjs');
const Student = require('../models/StudentModel'); // Import the Student model
const Alumni = require('../models/AlumniModel'); // Import the Alumni model

const registerStudent = async (req, res) => {
  const { fullName, rollNo, email, department, domain, year, percentile,password } = req.body;

  try {
    // Check if student already exists
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

    // Create new student record
    const newStudent = new Student({
      fullName, 
      rollNo, 
      email, 
      department,
      domain, 
      year, 
      percentile,
      password: hashedPassword,
      type:'student'
    });

    // Save the new student to the database
    await newStudent.save();
    console.log(newStudent);
    res.status(201).json({ message: 'Student registered successfully' });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: err.message });
  }
};

module.exports = { registerStudent };

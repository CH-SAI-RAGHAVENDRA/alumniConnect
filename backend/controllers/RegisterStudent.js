const bcrypt = require('bcryptjs');
const Student = require('../models/StudentModel'); // Import the Student model

const registerStudent = async (req, res) => {
  const { fullName, rollNo, email, department, domain, year, percentile,password } = req.body;

  try {
    // Check if student already exists
    const studentExists = await Student.findOne({ email });
    if (studentExists) {
      return res.status(400).json({ message: 'Student already exists' });
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
      passwordL: hashedPassword,
      type:'student'
    });

    // Save the new student to the database
    await newStudent.save();

    res.status(201).json({ message: 'Student registered successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { registerStudent };

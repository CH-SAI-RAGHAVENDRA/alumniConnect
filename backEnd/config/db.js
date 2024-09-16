const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const URI = process.env.MONGO_URI || 'mongodb+srv://vamshibitukuedu:Mdj5xhlFaNs8hABQ@alumniconnect.ius8s.mongodb.net/?retryWrites=true&w=majority&appName=ALUMNICONNECT';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); // Exit with failure
  }
};

module.exports = connectDB;

const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db'); // Import the MongoDB connection

dotenv.config(); // Load environment variables

connectDB(); // Connect to MongoDB

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, Alumni');
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

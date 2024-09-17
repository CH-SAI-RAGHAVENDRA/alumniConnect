const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db'); // Import the MongoDB connection
const userRoutes = require('./routes/userRoutes'); // Import user routes

dotenv.config(); // Load environment variables

connectDB(); // Connect to MongoDB

const app = express();
app.use(express.json());

app.use('/api', userRoutes); // Use user routes

app.get('/', (req, res) => {
  res.send('Hello, Alumni Connect!');
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

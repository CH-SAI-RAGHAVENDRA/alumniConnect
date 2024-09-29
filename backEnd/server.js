const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db'); // Import the MongoDB connection
const userRoutes = require('./routes/userRoutes'); // Import user routes
const cors = require('cors');

dotenv.config(); // Load environment variables

connectDB(); // Connect to MongoDB


const app = express();
app.use(express.json());
app.use(cors());
// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:3000');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//   next();
// });

app.use('/api', userRoutes); // Use user routes

app.get('/', (req, res) => {
  res.send('Hii iam an alumni');
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

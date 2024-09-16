const express = require('express'); // Importing Express framework
const dotenv = require('dotenv');   // To manage environment variables

dotenv.config();                    // Load environment variables

const app = express();              // Create Express app

// Middleware to parse JSON requests
app.use(express.json());

// Basic route for testing
app.get('/', (req, res) => {
  res.send('Hello, Alumni Connect!');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

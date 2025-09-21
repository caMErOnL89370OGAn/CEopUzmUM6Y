// 代码生成时间: 2025-09-21 10:48:19
// Import the necessary modules
cconst express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Initialize the express app
const app = express();
app.use(express.json()); // Middleware to parse JSON bodies

// JWT secret key
const JWT_SECRET_KEY = 'your_jwt_secret_key'; // Replace with your secret key

// Dummy user database for demonstration purposes
const users = [
  {
    username: 'admin',
    password: bcrypt.hashSync('password', 8), // Store the hashed password
  },
];

// Authentication route
app.post('/login', async (req, res) => {
  // Extract the username and password from the request body
  const { username, password } = req.body;

  // Error handling for missing credentials
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  // Find the user based on the provided username
  const user = users.find(u => u.username === username);

  // If the user does not exist, return an error
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  // Compare the provided password with the hashed password
  const isPasswordValid = await bcrypt.compare(password, user.password);

  // If the passwords do not match, return an error
  if (!isPasswordValid) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  // If the credentials are valid, generate a JWT token
  const token = jwt.sign({ username: user.username }, JWT_SECRET_KEY, { expiresIn: '1h' });

  // Return the JWT token to the client
  return res.status(200).json({ token });
});

// Error handling middleware
app.use((err, req, res, next) => {
  // Log the error for debugging
  console.error(err);

  // Send a generic error response to the client
  res.status(500).json({ error: 'An internal server error occurred' });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
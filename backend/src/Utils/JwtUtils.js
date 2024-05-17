const jwt = require('jsonwebtoken');

// Function to generate JWT token
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET); 
};


module.exports = { generateToken };

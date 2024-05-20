const jwt = require('jsonwebtoken');
const { ResponseHandler } = require('../responseHandler/responseHandler');
// Function to generate JWT token
const generateToken = (userId) => {
  try {
    return jwt.sign({ userId }, process.env.JWT_SECRET); 
  } catch (error) {
    ResponseHandler(res, null, error.message, 500);
  }
  
};


module.exports = { generateToken };

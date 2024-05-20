// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const { ResponseHandler } = require('../responseHandler/responseHandler');

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      return ResponseHandler(res, null, 'Unauthorized', 401);
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;

    const user = await User.findById(req.userId);
    if (!user) {
      return ResponseHandler(res, null, 'Unauthorized', 401);
    }

    next();
  } catch (error) {
    return ResponseHandler(res, null, error.message, 401);
  }
};

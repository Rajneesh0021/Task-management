// middleware/adminMiddleware.js
const User = require('../models/userModel');
const { ResponseHandler } = require('../responseHandler/responseHandler');

const checkAdmin = async (req, res, next) => {
  try {
    const userId = req.userId; 
    const user = await User.findById({_id:userId});
    if (!user) {
      return ResponseHandler(res, null, 'User not found', 404);
    }

    if (user.role !== 'Admin') {
      return ResponseHandler(res, null, 'Access denied', 403);
    }

    next();
  } catch (error) {
    ResponseHandler(res, null, error.message, 500);
  }
};

module.exports = checkAdmin;

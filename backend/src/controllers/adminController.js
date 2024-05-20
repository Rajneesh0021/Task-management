const User = require('../models/userModel');
const Task = require('../models/taskModel');
const { ResponseHandler } = require('../responseHandler/responseHandler');

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    ResponseHandler(res, users, 'Fetched all users successfully', 200);
  } catch (error) {
    ResponseHandler(res, null, error.message, 500);
  }
};

exports.getUserWithTasks = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);
    if (!user) {
      return ResponseHandler(res, null, 'User not found', 404);
    }
    const tasks = await Task.find({ assignedUser: userId });
    ResponseHandler(res, { user, tasks }, 'Fetched user and tasks successfully', 200);
  } catch (error) {
    ResponseHandler(res, null, error.message, 500);
  }
};

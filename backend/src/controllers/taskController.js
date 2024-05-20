const Task = require('../models/taskModel');
const { ResponseHandler } = require('../responseHandler/responseHandler');

exports.createTask = async (req, res, next) => {
  try {
    const task = new Task({ ...req.body, assignedUser: req.userId });
    await task.save();
    ResponseHandler(res, task, "New Task Created!", 201);
  } catch (error) {
    ResponseHandler(res, null, error.message, 500);
  }
};

exports.getAllTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find({ assignedUser: req.userId });
    ResponseHandler(res, tasks, "Tasks fetched successfully!", 200);
  } catch (error) {
    ResponseHandler(res, null, error.message, 500);
  }
};

exports.getTaskById = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.taskId);
    if (!task) {
      return ResponseHandler(res, null, 'Task not found', 404);
    }

    if (task.assignedUser.toString() !== req.userId) {
      return ResponseHandler(res, null, 'Unauthorized access to task', 403);
    }

    ResponseHandler(res, task, "Single task fetched!", 200);
  } catch (error) {
    ResponseHandler(res, null, error.message, 500);
  }
};

exports.updateTask = async (req, res, next) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.taskId,
      req.body,
      { new: true, runValidators: true }
    );
    if (!task) {
      return ResponseHandler(res, null, 'Task not found', 404);
    }

    if (task.assignedUser.toString() !== req.userId) {
      return ResponseHandler(res, null, 'Unauthorized access to task', 403);
    }

    ResponseHandler(res, task, "Updated the task!", 200);
  } catch (error) {
    ResponseHandler(res, null, "Failed to update task", 500);
  }
};

exports.deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.taskId);
    if (!task) {
      return ResponseHandler(res, null, 'Task not found', 404);
    }

    if (task.assignedUser.toString() !== req.userId) {
      return ResponseHandler(res, null, 'Unauthorized access to task', 403);
    }

    const deletedTask = await Task.findByIdAndDelete(req.params.taskId);
    ResponseHandler(res, deletedTask, "Deleted successfully!", 200);
  } catch (error) {
    ResponseHandler(res, null, "Failed to delete task", 500);
  }
};

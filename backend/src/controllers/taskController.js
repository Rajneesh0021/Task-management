const Task = require('../models/taskModel');

exports.createTask = async (req, res, next) => {
  try {
    const task = new Task({ ...req.body, assignedUser: req.userId });
    await task.save();
    res.status(201).json({message:"New Task Created !", task});
  } catch (error) {
    next(error);
  }
};

exports.getAllTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find({ assignedUser: req.userId });
    res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
};

exports.getTaskById = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.taskId);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    if (task.assignedUser.toString() !== req.userId) {
      return res.status(403).json({ message: 'Unauthorized access to task' });
    }

    res.status(200).json({message:"Single task fetched !",task});
  } catch (error) {
    next(error);
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
      return res.status(404).json({ message: 'Task not found !' });
    }

    if (task.assignedUser.toString() !== req.userId) {
      return res.status(403).json({ message: 'Unauthorized access to task !' });
    }

    res.status(201).json({message:"Updated the task !",task});
  } catch (error) {
    next(error);
  }
};

exports.deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.taskId);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    if (task.assignedUser.toString() !== req.userId) {
      return res.status(403).json({ message: 'Unauthorized access to task' });
    }

    const deletedTask = await Task.findByIdAndDelete({_id:req.params.taskId});
    res.status(200).send({message:"deleted successfully !", deletedTask});
  } catch (error) {
    next(error);
  }
};

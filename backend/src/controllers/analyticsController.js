const Task = require('../models/taskModel');
const { subDays, startOfDay, endOfDay } = require('date-fns');

exports.getCompletionStats = async (req, res, next) => {
  try {
    const sevenDaysAgo = subDays(new Date(), 7);
    const tasksCompletedLast7Days = await Task.countDocuments({
      completed: true,
      updatedAt: { $gte: startOfDay(sevenDaysAgo), $lte: endOfDay(new Date()) },
    });
    res.status(200).json({ tasksCompletedLast7Days });
  } catch (error) {
    next(error);
  }
};

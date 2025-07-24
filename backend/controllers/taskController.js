const Task = require('../models/Task');

exports.createTask = async (req, res) => {
  const { title, category, priority, dueDate } = req.body;

  try {
    const task = await Task.create({
      user: req.user,
      title,
      category,
      priority,
      dueDate
    });
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create task' });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user }).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
};

exports.updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, category, priority, dueDate, status } = req.body;

  try {
    const updated = await Task.findOneAndUpdate(
      { _id: id, user: req.user },
      { title, category, priority, dueDate, status },
      { new: true }
    );

    if (!updated) return res.status(404).json({ error: 'Task not found' });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update task' });
  }
};

exports.deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await Task.findOneAndDelete({ _id: id, user: req.user });
    if (!deleted) return res.status(404).json({ error: 'Task not found' });

    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete task' });
  }
};

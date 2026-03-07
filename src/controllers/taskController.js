import Task from "../models/Task.js";

// Create a new task
export const createTask = async (req, res) => {
  try {
    const { title, description, completed } = req.body;

    // Validate input
    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    // Create task and attach owner
    const task = new Task({
      title,
      description,
      completed,
      owner: req.user._id
    });

    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get all tasks for the logged-in user
export const getTasks = async (req, res) => {
  try {
    // Return only tasks belonging to req.user
    const tasks = await Task.find({ owner: req.user._id });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Delete a task
export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    // Check if task exists
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Check ownership
    if (task.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to delete this task" });
    }

    // Delete task
    await task.deleteOne();
    res.json({ message: "Task removed" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
const express = require("express");
const router = express.Router();
const Task = require("./models/Task");

// Create a new tasks22222
router.post("/tasks", async (req, res) => {
  try {
    const task = new Task(req.body);
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all tasks
router.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//PUT Request
router.put("/tasks/toggle/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { isCompleted } = req.body;

    console.log(id, isCompleted);
    const updatedTodo = await Task.findByIdAndUpdate(
      id,
      { isCompleted },
      { new: true }
    );

    if (!updatedTodo) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.json(updatedTodo);
  } catch (err) {
    console.error("Error updating todo item:", err); // Log the specific error
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//Delete All Tasks
router.delete("/tasks/delete-completed", async (req, res) => {
  try {
    console.log(`successfully deleted completed tasks!!`);
    const deletedTasks = await Task.deleteMany({ isCompleted: true });

    if (!deletedTasks) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.json(deletedTasks);
  } catch (err) {
    console.error("Error updating todo item:", err); // Log the specific error
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//Delete Task
router.delete("/tasks/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;

    console.log(`id ${id} successfully deleted!`);
    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.json(deletedTask);
  } catch (err) {
    console.error("Error updating todo item:", err); // Log the specific error
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/tasks/edit/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { text } = req.body;

    console.log(id, text);
    const editedTodo = await Task.findByIdAndUpdate(
      id,
      { text },
      { new: true }
    );

    if (!editedTodo) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.json(editedTodo);
  } catch (err) {
    console.error("Error updating todo item:", err); // Log the specific error
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Add more routes for updating and deleting tasks as needed

module.exports = router;

const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');

// Get all todos
router.get('/', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add new todo
router.post('/', async (req, res) => {
  const { title, description } = req.body;
  const newTodo = new Todo({ title, description });
  try {
    const savedTodo = await newTodo.save();
    res.json(savedTodo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update todo
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description, completed } = req.body;
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(id, { title, description, completed }, { new: true });
    res.json(updatedTodo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete todo
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Todo.findByIdAndDelete(id);
    res.json({ message: 'Todo deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;

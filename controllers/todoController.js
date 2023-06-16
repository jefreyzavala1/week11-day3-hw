const Todo = require("../models/todo");

exports.getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({});
    if (todos.length === 0) {
      res.status(404).json({ message: "No todos" });
    } else {
      res.json(todos);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.createTodo = async (req, res) => {
  try {
    if (!req.body.title) {
      throw new Error("Title is required");
    }

    const todo = new Todo(req.body);
    await todo.save();
    res.json(todo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getTodo = async (req, res) => {
  try {
    const todo = await Todo.findOne({ _id: req.params.id });
    if (!todo) {
      throw new Error("No todo to update");
    } else {
      res.json(todo);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateTodo = async (req, res) => {
  try {
    const todo = await Todo.findOne({ _id: req.params.id });
    if (!todo) {
      res.status(404).json({ message: "No todo to update" });
    } else {
      const properties = Object.keys(req.body);
      properties.forEach((property) => (todo[property] = req.body[property]));
      await todo.save();
      res.json(todo);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    const deletedTodo = await Todo.findOneAndRemove({ _id: req.params.id });
    if (!deletedTodo) {
      res.status(404).json({ message: "No todo to delete" });
    } else {
      res.json(deletedTodo);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

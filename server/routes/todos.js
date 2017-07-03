import express from 'express';
import Todo from '../models/todo';

const router = express.Router();

router.get('/', async (req, res) => {
  const todos = await Todo.find();
  return res.json({data: todos});
});


router.post('/', (req, res) => {
  const todoItem = res.body.todo;
  const todo = Todo(todoItem);
  todo.save();
});

export default router;

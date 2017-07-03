import express from 'express';
import Todo from '../models/todo';

const router = express.Router();

router.get('/', async (req, res) => {
  const todos = await Todo.find();
  return res.json({data: todos});
});


router.post('/', (req, res) => {
  const todoItem = req.body.todo;
  const todo = new Todo(todoItem);
  console.log(todoItem)
  console.log(todo)
  todo.save().then((result) => {
    return res.json({data: result, error: null});
  }).catch((err) => {
    return res.json({data: {}, error: err});
  });
});

export default router;

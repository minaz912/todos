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
  todo.save().then((result) => {
    return res.json({data: result, error: null});
  }).catch((err) => {
    return res.json({data: {}, error: err});
  });
});


router.put('/:id', (req, res) => {
  const todoId = req.params.id;
  if (todoId) {
    Todo.findById(todoId)
      .then((todo) => {
        return Object.assign(todo, req.body.todo)
      })
      .then((todo) => {
        return todo.save();
      })
      .then((updatedTodo) => {
        return res.json({data: updatedTodo});
      });
  } else {
    return res.json({data: {}, error: 'Incorrect Todo ID'});
  }
});

export default router;

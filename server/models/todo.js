import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const WEEK_IN_MS = 7 * 1 * 24 * 60 * 60 * 1000;

const todoSchema = new Schema({
  name: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    required: false
  },
  priority: {
    type: String,
    enum: ['NORMAL', 'IMPORTANT', 'URGENT'],
    default: 'NORMAL'
  },
  dueDate: {
    type: Date,
    required: false,
    default: new Date(new Date().getTime() + (WEEK_IN_MS))
  },
  completionDate: {
    type: Date,
    default: null
  }
});

mongoose.model('Todo', todoSchema);

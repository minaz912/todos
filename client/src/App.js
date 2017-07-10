import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  getTodosAction,
  addTodoAction,
  editTodoAction,
  deleteTodoAction
} from './modules/todosActions';

import TodoItem from './modules/todoItem';

import logo from './logo.svg';
import './App.css';

class App extends Component {
  componentDidMount() {
    this.props.getTodosList('ALL');
  }

  getTodos(ev) {
    this.props.getTodosList(ev.target.value);
  }

  addTodo(ev) {
    ev.preventDefault();
    const { title, desc, priority, date } = ev.target;

    const newTodo = {
      name: title.value,
      description: desc.value,
      dueDate: date.value,
      priority: priority.value
    };

    this.props.addTodo(newTodo);
  }

  editTodoCb(
    guid,
    name,
    description,
    priority,
    dueDate,
    completed,
    completionDate
  ) {
    const newCompletionDate = completed
      ? completionDate ? completionDate : new Date()
      : null;
    this.props.editTodo(guid, {
      name,
      description,
      priority,
      dueDate,
      completed,
      completionDate: newCompletionDate
    });
  }

  editTodo(ev) {
    ev.preventDefault();
    const guid = ev.target.todo.value;
    const {title, desc, date, priority} = ev.target;
    const editedTodo = {
      name: title.value,
      description: desc.value,
      dueDate: date.value,
      priority: priority.value
    };
    this.props.editTodo(guid, editedTodo);
  }

  deleteTodo(guid) {
    this.props.deleteTodo(guid);
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Todos List</h2>
        </div>
        <div className="container">
          <div className="row">
            <div className="view-total col-xs-4 col-xs-offset-6">
              <p>
                <strong>Total:</strong> {this.props.todos.length} Todos
              </p>
            </div>
            <div className="view-mode col-xs-2">
              <select value={this.viewMode} onChange={this.getTodos.bind(this)}>
                <option value="ALL">All</option>
                <option value="TODAY">Today</option>
                <option value="UPCOMING">Upcoming</option>
                <option value="COMPLETED">Completed</option>
              </select>
            </div>
          </div>
          <div className="container">
            <ul id="myUL">
              {this.props.todos.map(todo =>
                <TodoItem
                  key={todo._id}
                  guid={todo._id}
                  title={todo.name}
                  desc={todo.description}
                  dueDate={todo.dueDate}
                  priority={todo.priority}
                  completed={todo.completed}
                  editCb={this.editTodoCb.bind(this)}
                  deleteCb={this.deleteTodo.bind(this)}
                />
              )}
            </ul>
            <div className="header header-red">
              <h2>Add Todo</h2>
              <form
                className="add-todo-form"
                onSubmit={this.addTodo.bind(this)}
              >
                <label htmlFor="title">Title:</label>
                <input
                  className="form-control"
                  type="text"
                  id="title"
                  required
                />

                <br />

                <label htmlFor="desc">Description:</label>
                <textarea
                  className="form-control"
                  rows="6"
                  name="desc"
                  defaultValue="..."
                />

                <br />

                <label htmlFor="date">Due Date:</label>
                <input
                  className="form-control"
                  placeholder="Date"
                  type="date"
                  id="date"
                />

                <br />

                <label htmlFor="priority">Priority:</label>
                <select className="form-control" id="priority">
                  <option value="NORMAL">Normal</option>
                  <option value="IMPORTANT">Important</option>
                  <option value="URGENT">Urgent</option>
                </select>

                <br />

                <label />
                <input
                  type="submit"
                  className="addBtn btn btn-success"
                  value="Add"
                />
              </form>
            </div>
            <div className="header header-yellow">
              <h2>Edit Todo</h2>
              <form
                className="add-todo-form"
                onSubmit={this.editTodo.bind(this)}
              >

                <label htmlFor="todo-select">Todo:</label>
                <select id="todo">
                  {this.props.todos.map((todo) => <option key={todo._id} value={todo._id}>{todo.name || '<Untitled Todo>'}</option>
                  )}
                </select>

                <label htmlFor="title">Title:</label>
                <input
                  className="form-control"
                  type="text"
                  id="title"
                  defaultValue=""
                />

                <br />

                <label htmlFor="desc">Description:</label>
                <textarea
                  className="form-control"
                  rows="3"
                  name="desc"
                  defaultValue="..."
                />

                <br />

                <label htmlFor="date">Due Date:</label>
                <input
                  className="form-control"
                  placeholder="Date"
                  type="date"
                  id="date"
                />

                <br />

                <label htmlFor="priority">Priority:</label>
                <select className="form-control" id="priority">
                  <option value="NORMAL">Normal</option>
                  <option value="IMPORTANT">Important</option>
                  <option value="URGENT">Urgent</option>
                </select>

                <br />

                <label />
                <input
                  type="submit"
                  className="addBtn btn btn-success"
                  value="Add"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    todos: state.todos
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getTodosList: filter => dispatch(getTodosAction(filter)),
    addTodo: todo => dispatch(addTodoAction(todo)),
    editTodo: (guid, editedTodo) => dispatch(editTodoAction(guid, editedTodo)),
    deleteTodo: guid => dispatch(deleteTodoAction(guid))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

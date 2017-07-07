import React, {Component} from 'react';
import {connect} from 'react-redux';

import {getTodosAction, addTodoAction, editTodoAction} from './modules/todos';

import TodoItem from './todoItem';

import logo from './logo.svg';
import './App.css';

class App extends Component {
  componentDidMount() {
    this.props.getTodosList();
  }

  addTodo(ev) {
    ev.preventDefault();
    const {title, desc, priority, date} = ev.target;

    const newTodo = {
      name: title.value,
      description: desc.value,
      dueDate: date.value,
      priority: priority.value
    }

    this.props.addTodo(newTodo);
    // console.log(title, description, priority, date);
  }

  editTodo(guid, name, description, priority, dueDate, completed, completionDate) {
    console.log(guid, name, description, priority, dueDate, completed);
    const newCompletionDate = completed ? (completionDate ? completionDate : new Date()) : null;
    this.props.editTodo(guid, {
      name,
      description,
      priority,
      dueDate,
      completed,
      completionDate: newCompletionDate
    });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Todos List</h2>
        </div>
        <div className="container">
          <ul id="myUL">
            { this.props.todos.map((todo) => <TodoItem key={todo._id} guid={todo._id} title={todo.name} desc={todo.description} dueDate={todo.dueDate} priority={todo.priority} completed={todo.completed} editCb={this.editTodo.bind(this)} />)}
          </ul>
          <div id="myDIV" className="header">
            <h2>Add Todo</h2>
            <form className="add-todo-form" onSubmit={this.addTodo.bind(this)}>
              <label htmlFor="title">Title:</label>
              <input className="form-control" type="text" id="title" defaultValue="" />

              <br />

              <label htmlFor="desc">Description:</label>
              <textarea className="form-control" rows="4" name="desc" defaultValue="..." />

              <br />

              <label htmlFor="date">Due Date:</label>
              <input className="form-control" placeholder="Date" type="date" id="date" />

              <br />

              <label htmlFor="priority">Priority:</label>
              <select className="form-control" id="priority">
                <option value="NORMAL">Normal</option>
                <option value="IMPORTANT">Important</option>
                <option value="URGENT">Urgent</option>
              </select>

              <br />

              <label></label>
              <input type="submit" className="addBtn btn btn-success" value="Add" />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    todos: state.todos
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getTodosList: () => dispatch(getTodosAction()),
    addTodo: todo => dispatch(addTodoAction(todo)),
    editTodo: (guid, editedTodo) => dispatch(editTodoAction(guid, editedTodo))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

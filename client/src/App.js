import React, {Component} from 'react';
import {connect} from 'react-redux';

import {getTodosAction, addTodoAction} from './modules/todos';

import TodoItem from './todoItem';

import logo from './logo.svg';
import './App.css';

class App extends Component {
  componentDidMount() {
    this.props.getTodosList();
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Todos List</h2>
        </div>
        <ul id="myUL">
          { this.props.todos.map((todo) => <TodoItem key={todo._id} name={todo.name} priority={todo.priority} />)}
        </ul>
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
    // addTodo: todo => dispatch(addTodoAction())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

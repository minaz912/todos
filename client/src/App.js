import React, {Component} from 'react';
import {connect} from 'react-redux';

import {getTodosAction, addTodoAction} from './modules/todos';

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
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
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

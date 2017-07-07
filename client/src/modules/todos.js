import moment from 'moment';

// ACTIONS
export const getTodosAction = (viewMode) => {
  return (dispatch) => fetch('/todos')
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response;
            })
            .then((response) => response.json())
            .then((todos) => dispatch(getTodosListSuccess(todos.data, viewMode)));
}

export const getTodosListSuccess = (todos, viewMode) => {
  return {
    type: 'FETCH_TODOS_LIST_SUCCESS',
    todos,
    viewMode
  }
}

export const addTodoAction = (todo) => {
  return (dispatch) => {
    fetch('/todos', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({"todo": todo})
    })
    .then((response) => response.json())
    .then((todo) => dispatch(addTodoSuccess(todo.data)));
  }
}

export const addTodoSuccess = (todo) => {
  return {
    type: 'ADD_TODO_SUCCESS',
    todo
  }
}

export const editTodoAction = (guid, editedTodo) => {
  return (dispatch) => {
    fetch(`/todos/${guid}`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({"todo": editedTodo})
    })
    .then((response) => response.json())
    .then((todo) => dispatch(editTodoSuccess(todo.data)));
  }
}

export const editTodoSuccess = (todo) => {
  return {
    type: 'EDIT_TODO_SUCCESS',
    todo
  }
}

export const deleteTodoAction = (guid) => {
  return (dispatch) => {
    fetch(`/todos/${guid}`, {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'},
    })
    .then((response) => response.json())
    .then((todo) => dispatch(deleteTodoSuccess(todo.data._id)));
  }
}

export const deleteTodoSuccess = (guid) => {
  return {
    type: 'DELETE_TODO_SUCCESS',
    guid
  }
}

export const changeViewModeAction = (viewMode) => {
  return {
    type: 'CHANGE_VIEW_MODE',
    viewMode
  }
}

// REDUCERS
const initialState = []

export default (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_TODOS_LIST_SUCCESS':
      // return action.todos;
      if (action.viewMode === 'ALL') {
        return action.todos;
      } else if (action.viewMode === 'TODAY') {
        return action.todos
          .filter((todo) => !todo.completed && moment().diff(moment(todo.dueDate)) >= 0 );
      } else if (action.viewMode === 'COMPLETED') {
        return action.todos
          .filter((todo) => todo.completed)
          .sort((a, b) => moment.utc(a.completionDate).diff(moment.utc(b.completionDate)));
      } else if (action.viewMode === 'UPCOMING') {
        return action.todos
          .filter((todo) => !todo.completed && moment().diff(moment(todo.dueDate)) <= 0 )
          .sort((a, b) => moment.utc(a.completionDate).diff(moment.utc(b.completionDate)));
      } else {
        return action.todos;
      }
    case 'ADD_TODO_SUCCESS':
      return [
        ...state,
        action.todo
      ]
    case 'EDIT_TODO_SUCCESS':
      return state.map((todo, index) => {
        if (todo._id === action.todo._id) {
          return action.todo;
        }
        return todo;
      });
    case 'DELETE_TODO_SUCCESS':
      return state.filter(todo => todo._id !== action.guid);
    default:
      return state
  }
}

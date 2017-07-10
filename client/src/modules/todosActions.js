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

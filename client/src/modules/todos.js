// ACTIONS
export const getTodosAction = (dispatch) => {
  return (dispatch) => {
    fetch('/todos')
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response;
            })
            .then((response) => response.json())
            .then((todos) => dispatch(getTodosListSuccess(todos.data)));
  }
}

export const getTodosListSuccess = (todos) => {
  return {
    type: 'FETCH_TODOS_LIST_SUCCESS',
    todos
  }
}

export const addTodoAction = (todo) => {
  console.log(todo);
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


// REDUCERS
const initialState = []

export default (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_TODOS_LIST_SUCCESS':
      return action.todos;
    case 'ADD_TODO_SUCCESS':
      return [
        ...state,
        action.todo
      ]
    default:
      return state
  }
}

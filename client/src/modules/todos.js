// ACTIONS
export const getTodosAction = (dispatch) => {
  return (dispatch) => {
    fetch('/todos')
            .then((response) => {
              console.log('hello');
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


// REDUCERS
const initialState = []

export default (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_TODOS_LIST_SUCCESS':
      return action.todos;
    default:
      return state
  }
}

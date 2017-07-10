import moment from 'moment';

const PRIORITY_LEVELS = {
  'URGENT': 1,
  'IMPORTANT': 2,
  'NORMAL': 3
};

// REDUCERS
const initialState = []

export default (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_TODOS_LIST_SUCCESS':
      // return action.todos;
      if (action.viewMode === 'ALL') {
        return action.todos
          .sort((a, b) => PRIORITY_LEVELS[a.priority] > PRIORITY_LEVELS[b.priority]);
      } else if (action.viewMode === 'TODAY') {
        return action.todos
          .filter((todo) => !todo.completed && moment().diff(moment(todo.dueDate)) >= 0)
          .sort((a, b) => PRIORITY_LEVELS[a.priority] > PRIORITY_LEVELS[b.priority]);
      } else if (action.viewMode === 'COMPLETED') {
        return action.todos
          .filter((todo) => todo.completed)
          .sort((a, b) => moment.utc(a.completionDate).diff(moment.utc(b.completionDate)));
      } else if (action.viewMode === 'UPCOMING') {
        return action.todos
          .filter((todo) => !todo.completed && moment().diff(moment(todo.dueDate)) <= 0 )
          .sort((a, b) => moment.utc(a.completionDate).diff(moment.utc(b.completionDate)));
      } else {
        return action.todos
          .sort((a, b) => PRIORITY_LEVELS[a.priority] > PRIORITY_LEVELS[b.priority]);
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

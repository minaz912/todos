import moment from 'moment';
import { sortByPriority, sortByCompDate } from '../utils';

const initialState = []

export default(state = initialState, action) => {
  switch (action.type) {

    case 'FETCH_TODOS_LIST_SUCCESS':
      if (action.viewMode === 'ALL') {
        return sortByPriority(action.todos)
      } else if (action.viewMode === 'TODAY') {
        return sortByPriority(action.todos
                              .filter((todo) => !todo.completed && moment().diff(moment(todo.dueDate)) >= 0)
                             )
      } else if (action.viewMode === 'COMPLETED') {
        return sortByCompDate(action.todos
                              .filter((todo) => todo.completed)
                             )
      } else if (action.viewMode === 'UPCOMING') {
        return sortByCompDate(action.todos
                              .filter((todo) => !todo.completed && moment().diff(moment(todo.dueDate)) <= 0)
                             );
      } else {
        return sortByPriority(action.todos)
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

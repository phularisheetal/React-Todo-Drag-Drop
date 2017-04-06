import { combineReducers } from 'redux';
import TasksReducer from './reducer-tasks';
const rootReducer = combineReducers({
  tasks: TasksReducer
});

export default rootReducer;

import { combineReducers } from 'redux';
import userReducer from '../pages/User/reducer';
import repositoryReducer from '../pages/Dashboard/reducer';

export const rootReducer = combineReducers({
  repositoryReducer,
  userReducer,
});

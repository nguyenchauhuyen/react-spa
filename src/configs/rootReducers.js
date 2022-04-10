import { combineReducers } from 'redux';
import registerReducer from '../pages/Register/reducer';
import repositoryReducer from '../pages/Dashboard/reducer';

export const rootReducer = combineReducers({
  repositoryReducer,
  registerReducer,
});

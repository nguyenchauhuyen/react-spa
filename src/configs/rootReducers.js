import { combineReducers } from 'redux';
import registerReducer from '../pages/Register/reducer';
import loginReducer from '../pages/Login/reducer';

export const rootReducer = combineReducers({
  loginReducer,
  registerReducer,
});

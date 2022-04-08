import { combineReducers } from 'redux';
import registerReducer from '../pages/Register/reducer';
import dashboardReducer from '../pages/Dashboard/reducer';

export const rootReducer = combineReducers({
  // dashboardReducer,
  registerReducer,
});

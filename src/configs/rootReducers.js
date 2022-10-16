import { combineReducers } from 'redux';
import transactionReducer from '../pages/TransactionDetail/reducer';
import repositoryReducer from '../pages/Dashboard/reducer';

export const rootReducer = combineReducers({
  repositoryReducer,
  transactionReducer,
});

import { combineReducers } from 'redux';
import products from './products';
import itemEditing from './itemEditing';
import weather from './weatherReducer';

const appReducers = () =>
  combineReducers({
    products,
    itemEditing,
    weather
  });

export default appReducers;

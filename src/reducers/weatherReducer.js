import * as Types from './../constants/ActionTypes';

export const initialState = {
  list: [],
};

const weatherReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case Types.FETCH_WEATHER_FORECAST: {
        return { ...state, list: action.payload };
    }
    default:
      return state;
  }
};

export default weatherReducer;

import * as Types from '../constants/ActionTypes';
import { callApi } from '../utils/apiCaller';

export const getWeatherInfo = woeid => {
  return async dispatch => {
    try {
      const res = await callApi(`location/${woeid}/`, 'GET');
      dispatch({
          type: Types.FETCH_WEATHER_FORECAST,
          payload: res.data.consolidated_weather
      })
    } catch (e) {
    //   return Promise.reject(e.response);
    }
  };
};

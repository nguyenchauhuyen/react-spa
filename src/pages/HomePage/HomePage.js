import React, { useState, useEffect } from 'react';
import { Panel } from 'primereact/panel';
import { AutoComplete } from 'primereact/autocomplete';
import { useDispatch, useSelector } from 'react-redux';
import { getWeatherInfo } from '../../actions/weatherActions';
import { ProgressSpinner } from 'primereact/progressspinner';
import axios from 'axios';
import moment from 'moment';

const Dashboard = () => {
  const dispatch = useDispatch();
  let CancelToken = axios.CancelToken;
  let cancel;

  const { weather } = useSelector(store => ({
    weather: store.weather,
  }));

  const [state, setState] = useState({
    tasks: [],
    city: null,
    selectedCity: null,
    cities: [],
    weatherForecast: [],
    query: '',
    loading: false,
  });

  useEffect(() => {
    (() => {
      if (cancel) {
        //Cancel previous request
        cancel();
      }
      if (state.query.length) {
        axios
          .get(
            `https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/search/?query=${state.query}`,
            {
              cancelToken: new CancelToken(function executor(c) {
                // An executor function receives a cancel function as a parameter
                cancel = c;
              }),
            },
          )
          .then(res => {
            setState(state => ({ ...state, cities: res.data }));
          });
      }
    })();
  }, [state.query]);

  const onCityChange = e => {
    if (e.value.woeid) {
      setState(state => ({ ...state, selectedCity: e.value, loading: true }));
      dispatch(getWeatherInfo(e.value.woeid)).then(res => {
        setState(state => ({ ...state, loading: false }));
      });
    }
  };

  const searchCityByName = event => {
    // setTimeout(() => {
    if (!event.query.trim().length) {
      setState(state => ({ ...state, cities: [...state.cities] }));
    } else {
      setState(state => ({ ...state, query: event.query.trim(), selectedCity: null }));
    }
    // }, 250);
  };

  return (
    <div className="p-grid p-fluid dashboard">
      <div className="p-col-12 p-fluid">
        <Panel header="Location Search">
          <div className="p-grid">
            <div className="p-col-4">
              <AutoComplete
                value={state.selectedCity}
                field="title"
                suggestions={state.cities}
                completeMethod={searchCityByName}
                onChange={onCityChange}
                dropdown
              />
            </div>
          </div>
        </Panel>
      </div>
      {state.loading && (
        <ProgressSpinner
          style={{ width: '40px', height: '40px' }}
          strokeWidth="8"
          fill="#EEEEEE"
          animationDuration=".5s"
        />
      )}
      {!state.loading &&
        weather.list.map(item => {
          return (
            <div className="p-col-12 p-lg-4 weather-forecast" key={item.applicable_date}>
              <div className="card summary">
                <span className="title">{moment(item.applicable_date).format('dddd ll')}</span>
                <span className="detail">Min Temprature: {item.min_temp.toFixed(2)}</span>
                <span className="detail">Max Temprature: {item.max_temp.toFixed(2)}</span>
                <span className="count visitors">
                  <img
                    src={`https://www.metaweather.com/static/img/weather/${item.weather_state_abbr}.svg`}
                    style={{ width: 32 }}
                  />
                </span>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Dashboard;

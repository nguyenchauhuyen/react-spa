import React from 'react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import HomePage from './HomePage';

const mockStore = configureStore([]);

describe('HomePage', () => {
  let wrapper;
  let useEffect = jest.spyOn(React, 'useEffect');

  let mockUseEffect = () => {
    useEffect.mockImplementationOnce(f => f());
  };

  const cities = [
    { title: 'San Francisco', location_type: 'City', woeid: 2487956, latt_long: '37.777119, -122.41964' },
    { title: 'San Diego', location_type: 'City', woeid: 2487889, latt_long: '32.715691,-117.161720' },
    { title: 'San Jose', location_type: 'City', woeid: 2488042, latt_long: '37.338581,-121.885567' },
    { title: 'San Antonio', location_type: 'City', woeid: 2487796, latt_long: '29.424580,-98.494614' },
    { title: 'Santa Cruz', location_type: 'City', woeid: 2488853, latt_long: '36.974018,-122.030952' },
    { title: 'Santiago', location_type: 'City', woeid: 349859, latt_long: '-33.463039,-70.647942' },
    { title: 'Santorini', location_type: 'City', woeid: 56558361, latt_long: '36.406651,25.456530' },
    { title: 'Santander', location_type: 'City', woeid: 773964, latt_long: '43.461498,-3.810010' },
    { title: 'Busan', location_type: 'City', woeid: 1132447, latt_long: '35.170429,128.999481' },
    { title: 'Santa Cruz de Tenerife', location_type: 'City', woeid: 773692, latt_long: '28.46163,-16.267059' },
    { title: 'Santa Fe', location_type: 'City', woeid: 2488867, latt_long: '35.666431,-105.972572' },
  ];

  // beforeEach(() => {
  //   useEfect = jest.spyOn(React, 'useEffect');
  // });

  describe('on start', () => {
    beforeEach(() => {
      let store = mockStore({
        weather: { list: [] },
      });
      const originalDispatch = store.dispatch;
      store.dispatch = jest.fn(originalDispatch);
      // mockUseEffect();
      wrapper = mount(
        <Provider store={store}>
          <HomePage />
        </Provider>,
      );
    });

    it('should renders AutoComplete component', () => {
      expect(wrapper.find('AutoComplete')).toHaveLength(1);
    });

    it('should renders no forecast', () => {
      expect(wrapper.find('.weather-forecast')).toHaveLength(0);
    });
  });

  describe('given selected location', () => {
    // let handleChangeSpy = sinon.spy(HomePage.prototype, "onCityChange");

    beforeEach(() => {
      let store = mockStore({
        weather: {
          list: [
            {
              id: 5198705457102848,
              weather_state_name: 'Clear',
              weather_state_abbr: 'c',
              wind_direction_compass: 'NE',
              created: '2020-10-16T06:20:21.092475Z',
              applicable_date: '2020-10-16',
              min_temp: 19.165,
              max_temp: 29.22,
              the_temp: 27.005,
              wind_speed: 3.6353606593043293,
              wind_direction: 37.392768426384684,
              air_pressure: 1015.5,
              humidity: 28,
              visibility: 16.90719945518174,
              predictability: 68,
            },
            {
              id: 5262890186571776,
              weather_state_name: 'Clear',
              weather_state_abbr: 'c',
              wind_direction_compass: 'S',
              created: '2020-10-16T06:20:23.529550Z',
              applicable_date: '2020-10-17',
              min_temp: 17.795,
              max_temp: 27.11,
              the_temp: 24.05,
              wind_speed: 3.6876790465812985,
              wind_direction: 183.94181225837926,
              air_pressure: 1015.0,
              humidity: 43,
              visibility: 11.591679591187464,
              predictability: 68,
            },
            {
              id: 6587524538433536,
              weather_state_name: 'Clear',
              weather_state_abbr: 'c',
              wind_direction_compass: 'SSW',
              created: '2020-10-16T06:20:26.403532Z',
              applicable_date: '2020-10-18',
              min_temp: 15.585,
              max_temp: 22.895,
              the_temp: 22.855,
              wind_speed: 3.4056225090882575,
              wind_direction: 210.4342548826568,
              air_pressure: 1014.5,
              humidity: 59,
              visibility: 14.661563966436013,
              predictability: 68,
            },
            {
              id: 4784685239500800,
              weather_state_name: 'Clear',
              weather_state_abbr: 'c',
              wind_direction_compass: 'NW',
              created: '2020-10-16T06:20:29.338671Z',
              applicable_date: '2020-10-19',
              min_temp: 14.18,
              max_temp: 21.035,
              the_temp: 23.21,
              wind_speed: 3.161495824091307,
              wind_direction: 316.59367501829377,
              air_pressure: 1014.5,
              humidity: 62,
              visibility: 14.942423745327288,
              predictability: 68,
            },
            {
              id: 6389497890603008,
              weather_state_name: 'Clear',
              weather_state_abbr: 'c',
              wind_direction_compass: 'WNW',
              created: '2020-10-16T06:20:32.406143Z',
              applicable_date: '2020-10-20',
              min_temp: 13.515,
              max_temp: 20.655,
              the_temp: 18.42,
              wind_speed: 2.4510222301757736,
              wind_direction: 287.0,
              air_pressure: 1017.0,
              humidity: 78,
              visibility: 9.999726596675416,
              predictability: 68,
            },
            {
              id: 6694132606042112,
              weather_state_name: 'Light Cloud',
              weather_state_abbr: 'lc',
              wind_direction_compass: 'WSW',
              created: '2020-10-16T06:20:35.412922Z',
              applicable_date: '2020-10-21',
              min_temp: 13.295,
              max_temp: 20.345,
              the_temp: 17.32,
              wind_speed: 2.976127217052414,
              wind_direction: 252.0,
              air_pressure: 1016.0,
              humidity: 82,
              visibility: 9.999726596675416,
              predictability: 70,
            },
          ],
        },
      });

      const originalDispatch = store.dispatch;
      store.dispatch = jest.fn(originalDispatch);
      wrapper = mount(
        <Provider store={store}>
          <HomePage />
        </Provider>,
      );
    });

    it('should render 6 days forecast for selected location', () => {
      expect(wrapper.find('.weather-forecast')).toHaveLength(6);
    });

    it('should render first day correctly', () => {
      expect(wrapper.find('.title').first().text()).toEqual('Friday Oct 16, 2020');
    });

    it('should render first day of Min temperature correctly', () => {
      expect(wrapper.find('.min-temp').first().text()).toEqual('Min Temperature: 19.16');
    });

    it('should render first day of Max temperature correctly', () => {
      expect(wrapper.find('.max-temp').first().text()).toEqual('Max Temperature: 29.22');
    });

    // it('should trigger a function when change location', () => {
    //   const handleChangeSpy = sinon.spy(wrapper.instance(), "onCityChange");
    //   mockUseEffect();
    //   wrapper.find('AutoComplete').first().simulate('change', { value: cities[0]});
    //   expect(handleChangeSpy.calledOnce).toEqual(true);
    // });
  });
});

import React from 'react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import Dashboard from './Dashboard';

const mockStore = configureStore([]);

describe('Dashboard', () => {
  let wrapper;
  let useEffect = jest.spyOn(React, 'useEffect');

  let mockUseEffect = () => {
    useEffect.mockImplementationOnce(f => f());
  };

  const repositories = [
    [
      {
        id: 342912008,
        node_id: 'MDEwOlJlcG9zaXRvcnkzNDI5MTIwMDg=',
        name: 'nestjs-api',
        full_name: 'nguyenchauhuyen/nestjs-api',
        private: false,
        size: 205,
        stargazers_count: 0,
        watchers_count: 0,
        language: 'TypeScript',
        has_issues: true,
        has_projects: true,
        has_downloads: true,
        has_wiki: true,
        has_pages: false,
        forks_count: 0,
        mirror_url: null,
        archived: false,
        disabled: false,
        open_issues_count: 0,
        license: null,
        allow_forking: true,
        is_template: false,
        topics: [],
        visibility: 'public',
        forks: 0,
        open_issues: 0,
        watchers: 0,
        default_branch: 'master',
      },
      {
        id: 305136347,
        node_id: 'MDEwOlJlcG9zaXRvcnkzMDUxMzYzNDc=',
        name: 'react-nab',
        full_name: 'nguyenchauhuyen/react-nab',
        private: false,
        size: 218,
        stargazers_count: 0,
        watchers_count: 0,
        language: 'SCSS',
        has_issues: true,
        has_projects: true,
        has_downloads: true,
        has_wiki: true,
        has_pages: false,
        forks_count: 0,
        mirror_url: null,
        archived: false,
        disabled: false,
        open_issues_count: 0,
        license: null,
        allow_forking: true,
        is_template: false,
        topics: [],
        visibility: 'public',
        forks: 0,
        open_issues: 0,
        watchers: 0,
        default_branch: 'master',
      },
      {
        id: 232500448,
        node_id: 'MDEwOlJlcG9zaXRvcnkyMzI1MDA0NDg=',
        name: 'react-native-redux',
        full_name: 'nguyenchauhuyen/react-native-redux',
        private: false,
        size: 3719,
        stargazers_count: 1,
        watchers_count: 1,
        language: 'JavaScript',
        has_issues: true,
        has_projects: true,
        has_downloads: true,
        has_wiki: true,
        has_pages: false,
        forks_count: 0,
        mirror_url: null,
        archived: false,
        disabled: false,
        open_issues_count: 14,
        license: null,
        allow_forking: true,
        is_template: false,
        topics: [],
        visibility: 'public',
        forks: 0,
        open_issues: 14,
        watchers: 1,
        default_branch: 'master',
      },
    ],
  ];

  // beforeEach(() => {
  //   useEfect = jest.spyOn(React, 'useEffect');
  // });

  describe('on start', () => {
    beforeEach(() => {
      let store = mockStore({
        repositoryReducer: { data: [] },
      });
      const originalDispatch = store.dispatch;
      store.dispatch = jest.fn(originalDispatch);
      // mockUseEffect();
      wrapper = mount(
        <Provider store={store}>
          <Dashboard />
        </Provider>,
      );
    });

    it('should renders Table component', () => {
      expect(wrapper.find('DataTable')).toHaveLength(1);
    });

    it('should renders no repository', () => {
      expect(wrapper.find('.p-datatable-emptymessage')).toHaveLength(0);
    });
  });

  describe('given selected repositories', () => {
    // let handleChangeSpy = sinon.spy(Dashboard.prototype, "onCityChange");

    beforeEach(() => {
      let store = mockStore({
        repositoryReducer: {
          data: repositories,
        },
      });

      const originalDispatch = store.dispatch;
      store.dispatch = jest.fn(originalDispatch);
      wrapper = mount(
        <Provider store={store}>
          <Dashboard />
        </Provider>,
      );
    });

    it('should render 3 repository <> 3 TR element', () => {
      expect(wrapper.find('.p-datatable-tbody tr')).toHaveLength(3);
    });

    it('should render repository ID correctly', () => {
      expect(wrapper.find('.p-datatable-tbody tr').first().find('.p-column-title').fisrt().text()).toEqual('342912008');
    });

    it('should render repository NAME correctly', () => {
      expect(wrapper.find('.p-column-title').first().text()).toEqual('nestjs-api');
    });

    // it('should trigger a function when button click', () => {
    //   const handleChangeSpy = sinon.spy(wrapper.instance(), "handleSearchRepos");
    //   mockUseEffect();
    //   wrapper.find('AutoComplete').first().simulate('change', { value: repositories[0]});
    //   expect(handleChangeSpy.calledOnce).toEqual(true);
    // });
  });
});

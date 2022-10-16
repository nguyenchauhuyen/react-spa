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
  ];

  const initialState = {
    data: [],
    loaders: {
      isLoading: false,
      isError: false,
      isSuccess: false,
      response: {},
    },
    shareLinkedInLoaders: {
      isLoading: false,
      isError: false,
      isSuccess: false,
      response: {},
      request: {},
    },
  };

  // beforeEach(() => {
  //   useEfect = jest.spyOn(React, 'useEffect');
  // });

  describe('UnitTest table component', () => {
    beforeEach(() => {
      let store = mockStore({
        registerReducer: {
          data: { name: 'test', email: 'nguyenchauhuyen@gmail.com' },
          loaders: {
            isLoading: false,
            isError: false,
            isSuccess: false,
            response: {},
          },
        },
        repositoryReducer: initialState,
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
      expect(wrapper.find('.p-datatable-emptymessage')).toHaveLength(1);
    });
  });

  describe('integration test on repositories', () => {
    beforeEach(() => {
      let store = mockStore({
        registerReducer: {
          data: { name: 'test', email: 'nguyenchauhuyen@gmail.com' },
          loaders: {
            isLoading: false,
            isError: false,
            isSuccess: false,
            response: {},
          },
        },
        repositoryReducer: {
          data: repositories,
          loaders: {
            isLoading: false,
            isError: false,
            isSuccess: false,
            response: {},
          },
          shareLinkedInLoaders: {
            isLoading: false,
            isError: false,
            isSuccess: false,
            response: {},
            request: {},
          },
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

    it('should render table body', () => {
      expect(wrapper.find('tbody')).toHaveLength(1);
    });

    it('should render 3 repository <> 3 TR element', () => {
      let body = wrapper.find('tbody');
      expect(body.find('tr')).toHaveLength(3);
    });

    it('should render repository ID correctly', () => {
      let firstRepo = wrapper.find('tbody').find('tr').first();
      expect(firstRepo.find('td').at(0).text()).toEqual('ID342912008');
    });

    it('should render repository NAME correctly', () => {
      let firstRepo = wrapper.find('tbody').find('tr').first();
      expect(firstRepo.find('td').at(1).text()).toEqual('Namenestjs-api');
    });

    // it('should trigger a function when button click', () => {
    //   const handleChangeSpy = sinon.spy(wrapper.instance(), "handleSearchRepos");
    //   mockUseEffect();
    //   wrapper.find('Button').first().simulate('change', { username: ''});
    //   expect(handleChangeSpy.calledOnce).toEqual(true);
    // });
  });
});

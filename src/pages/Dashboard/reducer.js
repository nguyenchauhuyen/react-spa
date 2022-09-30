import { repositoryContansts } from './constants';

const initialState = {
  data: [{ name: 'GrahamCampbell' }, { name: 'fabpot' }, { name: 'weierophinney' }, { name: 'rkh' }, { name: 'josh' }],
  loaders: {
    isLoading: false,
    isError: false,
    isSuccess: false,
  },
  shareLinkedInLoaders: {
    isLoading: false,
    isError: false,
    isSuccess: false,
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case repositoryContansts.GET_REPOSITORY_REQUEST: {
      return {
        ...state,
        loaders: {
          ...state.loaders,
          isLoading: true,
          isSuccess: false,
          isError: false,
        },
      };
    }
    case repositoryContansts.GET_REPOSITORY_FAILURE: {
      return {
        ...state,
        loaders: {
          ...state.loaders,
          isLoading: false,
          isSuccess: false,
          isError: true,
          response: action.response,
        },
      };
    }
    case repositoryContansts.GET_REPOSITORY_SUCESS: {
      return {
        ...state,
        loaders: {
          ...state.loaders,
          isLoading: false,
          isSuccess: true,
          isError: false,
          response: action.response,
        },
        data: action.payload,
      };
    }

    //shareLinkedInLoaders
    case repositoryContansts.SHARE_LINKEDIN_REQUEST: {
      return {
        ...state,
        shareLinkedInLoaders: {
          ...state.loaders,
          isLoading: true,
          isSuccess: false,
          isError: false,

          request: action.payload,
        },
      };
    }
    case repositoryContansts.SHARE_LINKEDIN_FAILURE: {
      return {
        ...state,
        shareLinkedInLoaders: {
          ...state.loaders,
          isLoading: false,
          isSuccess: false,
          isError: true,
          response: action.response,
        },
      };
    }
    case repositoryContansts.SHARE_LINKEDIN_SUCESS: {
      return {
        ...state,
        shareLinkedInLoaders: {
          ...state.loaders,
          isLoading: false,
          isSuccess: true,
          isError: false,
          response: action.response,
        },
        data: action.payload,
      };
    }
    default:
      return state;
  }
};

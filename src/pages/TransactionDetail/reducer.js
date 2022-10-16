import { contansts } from './constants';

const initialState = {
  data: {},
  loaders: {
    isLoading: false,
    isError: false,
    isSuccess: false,
    response: {},
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case contansts.transaction_REQUEST: {
      return {
        ...state,
        loaders: {
          ...state.loaders,
          isLoading: true,
          isSuccess: false,
          isError: false,
          response: {},
        },
      };
    }
    case contansts.transaction_FAILURE: {
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
    case contansts.transaction_SUCESS: {
      return {
        ...state,
        loaders: {
          ...state.loaders,
          isLoading: false,
          isSuccess: true,
          isError: false,
        },
        data: { ...state.data, ...action.payload },
      };
    }
    default:
      return state;
  }
};

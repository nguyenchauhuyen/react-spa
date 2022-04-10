import { registerContansts } from './constants';

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
    case registerContansts.REGISTER_REQUEST: {
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
    case registerContansts.REGISTER_FAILURE: {
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
    case registerContansts.REGISTER_SUCESS: {
      return {
        ...state,
        loaders: {
          ...state.loaders,
          isLoading: false,
          isSuccess: true,
          isError: false,
          response: action.response,
        },
        data: { ...state.data, ...action.payload },
      };
    }
    default:
      return state;
  }
};

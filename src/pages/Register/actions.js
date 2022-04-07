import { registerContansts } from './constants';

export const registerActions = {
  registerRequest: payload => ({
    type: registerContansts.REGISTER_REQUEST,
    payload,
  }),
  registerFailure: () => ({
    type: registerContansts.REGISTER_FAILURE,
    response: {},
  }),
  registerSuccess: ({ payload }) => ({
    payload,
    type: registerContansts.REGISTER_SUCESS,
    response: {},
  }),
};

import { accountContansts } from './constants';

export const userActions = {
  getAccountRequest: payload => ({
    type: accountContansts.account_REQUEST,
    payload,
  }),
  getAccountFailure: () => ({
    type: accountContansts.account_FAILURE,
    response: {},
  }),
  getAccountSuccess: ({ payload }) => ({
    payload,
    type: accountContansts.account_SUCESS,
    response: {},
  }),
};

import { contansts } from './constants';

export const transactionActions = {
  getRequest: payload => ({
    type: contansts.transaction_REQUEST,
    payload,
  }),
  getFailure: () => ({
    type: contansts.transaction_FAILURE,
    response: {},
  }),
  getSuccess: ({ payload }) => ({
    payload,
    type: contansts.transaction_SUCESS,
    response: {},
  }),
};

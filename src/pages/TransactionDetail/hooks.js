import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { transactionActions } from './actions';

const transactionReducerSelector = state => state.transactionReducer;

export const useTransaction = () => {
  const { data, loaders } = useSelector(transactionReducerSelector);
  const dispatch = useDispatch();

  const getTransactionDetail = useCallback(payload => {
    return dispatch(transactionActions.getRequest(payload));
  }, []);

  return {
    data,
    loaders,
    actions: {
      getTransactionDetail,
    },
  };
};

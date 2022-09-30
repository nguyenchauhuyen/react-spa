import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { userActions } from './actions';

const userReducerSelector = state => state.userReducer;

export const useRegister = () => {
  const { data, loaders } = useSelector(userReducerSelector);
  const dispatch = useDispatch();
  const getUserInfo = useCallback(payload => {
    return dispatch(userActions.getAccountRequest(payload));
  }, []);

  return {
    data,
    loaders,
    actions: {
      getUserInfo,
    },
  };
};

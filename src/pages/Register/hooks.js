import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { registerActions } from './actions';

const registerReducerSelector = state => state.registerReducer;

export const useRegister = () => {
  const { data, loaders } = useSelector(registerReducerSelector);
  const dispatch = useDispatch();
  const registerAccount = useCallback(payload => {
    return dispatch(registerActions.registerRequest(payload));
  }, []);

  return {
    data,
    loaders,
    actions: {
      registerAccount,
    },
  };
};

import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { repositoryActions } from './actions';
import { repositoryReducerSelector } from './selectors';

export const useRepository = () => {
  const { data, loaders } = useSelector(repositoryReducerSelector);

  const dispatch = useDispatch();
  const getRepositories = useCallback(payload => {
    return dispatch(repositoryActions.getRepositoryRequest(payload));
  }, []);

  return {
    data,
    loaders,
    actions: {
      getRepositories,
    },
  };
};

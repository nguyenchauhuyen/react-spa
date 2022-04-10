import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { repositoryActions } from './actions';
import { repositoryReducerSelector } from './selectors';

export const useRepository = () => {
  const { data, loaders, shareLinkedInLoaders } = useSelector(repositoryReducerSelector);

  console.log(shareLinkedInLoaders);
  const dispatch = useDispatch();
  const getRepositories = useCallback(payload => {
    return dispatch(repositoryActions.getRepositoryRequest(payload));
  }, []);

  const shareRepositoryToLinkedIn = useCallback(payload => {
    return dispatch(repositoryActions.shareLinkedInRequest(payload));
  }, []);

  return {
    data,
    loaders,
    shareLinkedInLoaders,
    actions: {
      getRepositories,
      shareRepositoryToLinkedIn,
    },
  };
};

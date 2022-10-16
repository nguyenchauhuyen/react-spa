import { createSelector } from 'reselect';

export const repositoryReducerSelector = state => state.repositoryReducer;

export const repositoryDataSelector = createSelector(
  repositoryReducerSelector,
  repositoryReducer => repositoryReducer.data,
);

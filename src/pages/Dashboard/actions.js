import { repositoryContansts } from './constants';

export const repositoryActions = {
  getRepositoryRequest: payload => ({
    type: repositoryContansts.GET_REPOSITORY_REQUEST,
    payload,
  }),
  getRepositoryFailure: () => ({
    type: repositoryContansts.GET_REPOSITORY_FAILURE,
    response: {},
  }),
  getRepositorySuccess: ({ payload }) => ({
    payload,
    type: repositoryContansts.GET_REPOSITORY_SUCESS,
    response: {},
  }),
};

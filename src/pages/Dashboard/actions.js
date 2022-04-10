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
  shareLinkedInRequest: payload => ({
    type: repositoryContansts.SHARE_LINKEDIN_REQUEST,
    payload,
  }),
  shareLinkedInFailure: () => ({
    type: repositoryContansts.SHARE_LINKEDIN_FAILURE,
    response: {},
  }),
  shareLinkedInSuccess: ({ payload }) => ({
    payload,
    type: repositoryContansts.SHARE_LINKEDIN_SUCESS,
    response: {},
  }),
};

import { put, call, takeLatest } from 'redux-saga/effects';
import { repositoryContansts } from './constants';
import { repositoryActions } from './actions';
import * as Api from './services';

function* getRepositories({ payload }) {
  try {
    console.log(payload.searchTerm, 'saga');
    const res = yield call(Api.getRepositories, {
      ...payload,
    });

    //.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

    yield put(
      repositoryActions.getRepositorySuccess({
        payload: payload.searchTerm
          ? res.accounts.filter(item => item.description.includes(payload.searchTerm))
          : res.accounts,
      }),
    );
  } catch (e) {
    console.error(e);
    yield put(repositoryActions.getRepositoryFailure());
  }
}

export default function* () {
  yield takeLatest(repositoryContansts.GET_REPOSITORY_REQUEST, getRepositories);
}

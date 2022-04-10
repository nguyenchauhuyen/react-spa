import { put, call, takeLatest, select } from 'redux-saga/effects';
import { repositoryContansts } from './constants';
import { repositoryActions } from './actions';
import * as Api from './services';
import { repositoryDataSelector } from './selectors';

function* getRepositories(action) {
  try {
    const res = yield call(Api.getRepositories, {
      ...action.payload,
    });

    console.log(res);

    //Register Success
    yield put(
      repositoryActions.getRepositorySuccess({
        payload: res,
      }),
    );
  } catch (e) {
    console.error(e);
    yield put(repositoryActions.getRepositoryFailure());
  }
}

function* shareRepositoryToLinkedIn(action) {
  const repositories = yield select(repositoryDataSelector);
  try {
    yield call(Api.shareLinkedin, {
      ...action.payload,
    });

    const selectedIndex = repositories.findIndex(e => e.id === action.payload.id);

    if (selectedIndex > -1) {
      const selectedRepository = repositories[selectedIndex];

      if (!selectedRepository.counter) {
        selectedRepository.counter = 1;
      } else {
        selectedRepository.counter++;
      }

      repositories[selectedIndex] = selectedRepository;

      //Sharing Success
      yield put(
        repositoryActions.shareLinkedInSuccess({
          payload: repositories,
        }),
      );
    }
  } catch (e) {
    console.error(e);
    yield put(repositoryActions.shareLinkedInFailure());
  }
}

export default function* () {
  yield takeLatest(repositoryContansts.GET_REPOSITORY_REQUEST, getRepositories);
  yield takeLatest(repositoryContansts.SHARE_LINKEDIN_REQUEST, shareRepositoryToLinkedIn);
}

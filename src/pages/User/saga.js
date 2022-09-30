import { put, call, takeLatest } from 'redux-saga/effects';
import { accountContansts } from './constants';
import { userActions } from './actions';

import * as Api from './services';

function* getUserInfoSaga(action) {
  try {
    const res = yield call(Api.getUserInfo, {
      ...action.payload,
    });

    console.log(res);

    yield put(
      userActions.getAccountSuccess({
        payload: res,
      }),
    );
  } catch (e) {
    console.error(e);
    yield put(userActions.getAccountFailure());
  }
}

export default function* () {
  yield takeLatest(accountContansts.account_REQUEST, getUserInfoSaga);
}

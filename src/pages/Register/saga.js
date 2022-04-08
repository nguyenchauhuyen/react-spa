import { put, call, takeLatest } from 'redux-saga/effects';
import { registerContansts } from './constants';
import { registerActions } from './actions';

import * as Api from './services';

function* registerAccount(action) {
  try {
    const res = yield call(Api.registerAccount, {
      ...action.payload,
    });

    console.log(res);

    //Register Success
    yield put(
      registerActions.registerSuccess({
        payload: action.payload,
      }),
    );
  } catch (e) {
    console.error(e);
    yield put(registerActions.registerFailure());
  }
}

export default function* () {
  yield takeLatest(registerContansts.REGISTER_REQUEST, registerAccount);
}

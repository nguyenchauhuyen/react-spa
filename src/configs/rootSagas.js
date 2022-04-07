import { fork, all } from 'redux-saga/effects';
import registerSaga from '../pages/Register/saga';
import loginSaga from '../pages/Login/saga';

export function* rootSaga() {
  yield all([fork(registerSaga)]);
}

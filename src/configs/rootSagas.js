import { fork, all } from 'redux-saga/effects';
import registerSaga from '../pages/User/saga';
import dashboardSaga from '../pages/Dashboard/saga';

export function* rootSaga() {
  yield all([fork(registerSaga), fork(dashboardSaga)]);
}

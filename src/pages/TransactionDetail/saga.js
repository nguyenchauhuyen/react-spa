import { put, call, takeLatest } from 'redux-saga/effects';
import { contansts } from './constants';
import { transactionActions } from './actions';

import * as Api from './services';

function* getTransactionInfoSaga({ payload }) {
  try {
    const res = yield call(Api.getTransactionInfo, {
      ...payload,
    });

    console.log(payload.id, 'saga', res);

    yield put(
      transactionActions.getSuccess({
        payload: res.accounts.find(item => item.id === Number(payload.id)),
      }),
    );
  } catch (e) {
    console.error(e);
    yield put(transactionActions.getFailure());
  }
}

export default function* () {
  yield takeLatest(contansts.transaction_REQUEST, getTransactionInfoSaga);
}

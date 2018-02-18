import { put, call, takeLatest } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { TOGGLE_TIMER, FETCH_ITEMS } from '../types';
import api from '../api';

function* toggleTimer(payload) {
  yield call(delay, 1000);
  const registration = yield call(api.registrations.toggle, payload.id);

  yield put({
    type: FETCH_ITEMS,
    listName: 'registrations'
  });
}

function* registrationSaga() {
  yield takeLatest(TOGGLE_TIMER, toggleTimer);
}

export default registrationSaga;

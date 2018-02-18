import { put, call, takeLatest, all } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import {
  FETCH_ITEMS,
  FETCH_ITEMS_SUCCESS,
  CREATE_ITEM,
  CREATE_ITEM_SUCCESS,
  CREATE_ITEM_FAILURE
} from '../types';
import api from '../api';

function* fetchItems(payload) {
  yield call(delay, 1000);
  const items = yield call(api.list.fetchAll, payload.listName);

  yield put({
    type: FETCH_ITEMS_SUCCESS,
    name: payload.listName,
    items
  });
}

function* createItem(payload) {
  yield call(delay, 1000);
  try {
    const { listName, item } = payload;
    const result = yield call(api.list.create, listName, item);
    yield put({
      type: CREATE_ITEM_SUCCESS,
      item: result
    });
    yield put({
      type: FETCH_ITEMS,
      listName
    });
  } catch (error) {
    yield put({
      type: CREATE_ITEM_FAILURE,
      error
    });
  }
}

function* listSaga() {
  yield all([
    takeLatest(FETCH_ITEMS, fetchItems),
    takeLatest(CREATE_ITEM, createItem)
  ]);
}

export default listSaga;

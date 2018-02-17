import { put, call, takeLatest } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { FETCH_PROJECTS, PROJECTS_FETCHING, PROJECTS_FETCHED } from '../types';
import api from '../api';

function* fetchProjects() {
  yield put({
    type: PROJECTS_FETCHING
  });
  yield call(delay, 1000);

  const projects = yield call(api.projects.fetchAll);

  yield put({
    type: PROJECTS_FETCHED,
    projects
  });
}

function* projectSaga() {
  yield takeLatest(FETCH_PROJECTS, fetchProjects);
}

export default projectSaga;

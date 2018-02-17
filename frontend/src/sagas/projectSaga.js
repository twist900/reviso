import { put, call, takeLatest } from 'redux-saga/effects';
import { FETCH_PROJECTS, PROJECTS_FETCHED } from '../types';
import api from '../api';

function* fetchProjects() {
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

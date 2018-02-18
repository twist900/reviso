import { put, call, takeLatest, all } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import {
  FETCH_PROJECTS,
  FETCH_PROJECTS_SUCCESS,
  CREATE_PROJECT,
  CREATE_PROJECT_SUCCESS,
  CREATE_PROJECT_FAILURE
} from '../types';
import api from '../api';

function* fetchProjects() {
  yield call(delay, 1000);
  const projects = yield call(api.projects.fetchAll);

  yield put({
    type: FETCH_PROJECTS_SUCCESS,
    projects
  });
}

function* createProject(payload) {
  yield call(delay, 1000);
  try {
    const project = yield call(api.projects.create, payload.project);
    yield put({
      type: CREATE_PROJECT_SUCCESS,
      project
    });
    yield put({
      type: FETCH_PROJECTS
    });
  } catch (error) {
    yield put({
      type: CREATE_PROJECT_FAILURE,
      error
    });
  }
}

function* projectSaga() {
  yield all([
    takeLatest(FETCH_PROJECTS, fetchProjects),
    takeLatest(CREATE_PROJECT, createProject)
  ]);
}

export default projectSaga;

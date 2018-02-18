import {
  FETCH_PROJECTS_SUCCESS,
  FETCH_PROJECTS,
  CREATE_PROJECT,
  CREATE_PROJECT_SUCCESS,
  CREATE_PROJECT_FAILURE,
  RESET_NEW_PROJECT
} from '../types';

const initialState = {
  items: [],
  loading: false,
  newProject: { project: null, error: null, loading: false }
};

const projects = (state = initialState, action = {}) => {
  switch (action.type) {
    case FETCH_PROJECTS:
      return { ...state, loading: true };
    case FETCH_PROJECTS_SUCCESS:
      return { ...state, loading: false, items: action.projects };
    case CREATE_PROJECT:
      return {
        ...state,
        newProject: { error: null, project: null, loading: true }
      };
    case CREATE_PROJECT_SUCCESS:
      return {
        ...state,
        newProject: { project: action.project, error: null, loading: false }
      };
    case CREATE_PROJECT_FAILURE:
      return {
        ...state,
        newProject: {
          project: null,
          loading: false,
          error: action.error.message
        }
      };
    case RESET_NEW_PROJECT:
      return {
        ...state,
        newProject: {
          project: null,
          loading: false,
          error: null
        }
      };
    default:
      return state;
  }
};

export default projects;

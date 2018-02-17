import { PROJECTS_FETCHED, PROJECTS_FETCHING } from '../types';

const initialState = { items: [], loading: false };
const projects = (state = initialState, action = {}) => {
  switch (action.type) {
    case PROJECTS_FETCHING:
      return { ...state, loading: true };
    case PROJECTS_FETCHED:
      return { ...state, loading: false, items: action.projects };
    default:
      return state;
  }
};

export default projects;

import { PROJECTS_FETCHED } from '../types';

const initialState = { items: [] };
const projects = (state = initialState, action = {}) => {
  switch (action.type) {
    case PROJECTS_FETCHED:
      return { ...state, items: action.projects };
    default:
      return state;
  }
};

export default projects;

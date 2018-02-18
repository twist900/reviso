import { FETCH_PROJECTS, CREATE_PROJECT, RESET_NEW_PROJECT } from '../types';

export const fetchProjects = () => ({ type: FETCH_PROJECTS });
export const createProject = project => ({ type: CREATE_PROJECT, project });
export const resetNewProject = () => ({ type: RESET_NEW_PROJECT });

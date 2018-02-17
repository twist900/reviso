import Project from '../models/Project';

class ProjectService {
  static find(criteria) {
    return Project.find(criteria);
  }

  static insert(project) {
    return Project.create(project);
  }
}

export default ProjectService;

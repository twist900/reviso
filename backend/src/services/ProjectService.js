import Project from '../models/Project';

class ProjectService {
  static find(criteria) {
    return Project.find(criteria);
  }
}

export default ProjectService;

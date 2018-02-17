import ProjectService from '../services/ProjectService';

exports.getProjects = async (req, res) => {
  const projects = await ProjectService.find(req.query);
  res.json({ data: projects });
};

exports.createProject = async (req, res) => {
  try {
    const project = await ProjectService.insert(req.body);
    res.json({ data: project });
  } catch (error) {
    res.status(400).json({ error: { message: error.message } });
  }
};

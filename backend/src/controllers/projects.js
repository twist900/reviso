import ProjectService from '../services/ProjectService';

exports.getProjects = async (req, res) => {
  const projects = await ProjectService.find(req.query);
  res.json({ data: projects });
};

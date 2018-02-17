import express from 'express';
import projectsController from '../controllers/projects';

const router = express.Router();
router.get('/', projectsController.getProjects);
router.post('/', projectsController.createProject);

export default router;

import express from 'express';
import projectsController from '../controllers/projects';

const router = express.Router();
router.get('/', projectsController.getProjects);

export default router;

import express from 'express';
import projectsController from '../controllers/projects';

const router = express.Router();
router.get('/', projectsController.get);
router.post('/', projectsController.create);

export default router;

import express from 'express';
import registrationsController from '../controllers/registrations';

const router = express.Router();
router.get('/', registrationsController.get);
router.post('/', registrationsController.create);
router.get('/:id/toggle', registrationsController.toggle)
export default router;

import express from 'express';
import registrationsController from '../controllers/registrations';

const router = express.Router();
router.get('/', registrationsController.getRegistrations);
router.post('/', registrationsController.createRegistration);

export default router;

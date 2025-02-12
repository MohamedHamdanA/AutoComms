import { Router } from 'express';
import AuthController from '../controllers/authController.js';
import { validateSession } from '../middleware/validateSession.js';
import { validateCsrf } from '../middleware/validateCsrf.js';

const router = Router();

router.get('/google', AuthController.googleAuth);
router.get('/google/callback', AuthController.googleAuthCallback);
router.post('/signout', AuthController.signout);

export default router;

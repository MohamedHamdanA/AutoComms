import { Router } from 'express';
import AuthController from '../controllers/authController.js';
import StudentAuthController from '../controllers/studentAuthController.js';
import { validateSession } from '../middleware/validateSession.js';
import { validateCsrf } from '../middleware/validateCsrf.js';

const router = Router();

// Faculty Authentication Routes
router.get('/google', AuthController.googleAuth);
router.get('/google/callback', AuthController.googleAuthCallback);
router.post('/signout', AuthController.signout);

// Student Authentication Routes
router.get('/student/google', StudentAuthController.googleAuth);
router.get('/student/google/callback', StudentAuthController.googleAuthCallback);
router.post('/student/signout', validateSession, validateCsrf, StudentAuthController.signout);

export default router;

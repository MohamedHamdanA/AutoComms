import { Router } from 'express';
import formController from '../controllers/formController.js';
import { validateSession } from '../middleware/validateSession.js';
import { validateCsrf } from '../middleware/validateCsrf.js';

const router = Router();

router.use("/:classId", validateSession, validateCsrf, formController);

export default router;

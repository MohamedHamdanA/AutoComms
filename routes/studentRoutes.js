import express from 'express';
import { getStudentForms } from '../controllers/studentController.js';
import { validateSession } from '../middleware/validateSession.js';
import { validateCsrf } from '../middleware/validateCsrf.js';

const router = express.Router();

router.get('/:studentId/forms', getStudentForms);

export default router;

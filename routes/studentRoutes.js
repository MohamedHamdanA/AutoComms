import express from 'express';
import { getStudentFormsNotFilled } from '../controllers/studentController.js';
import { validateSession } from '../middleware/validateSession.js';
import { validateCsrf } from '../middleware/validateCsrf.js';

const router = express.Router();

router.get('/forms-not-filled', getStudentFormsNotFilled);

export default router;

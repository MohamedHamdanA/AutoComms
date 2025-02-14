// routes/formRoutes.js
import express from 'express';
import { validateSession } from '../middleware/validateSession.js';
import { validateCsrf } from '../middleware/validateCsrf.js';
import { createGoogleForm, getFormResponses } from '../controllers/formController.js';

const router = express.Router();

// Route for creating a Google Form and notifying students
router.post('/create',validateSession, validateCsrf, createGoogleForm);

// Route for fetching form responses and matching them with enrolled students
router.get('/responses/:formId',validateSession, validateCsrf, getFormResponses);

export default router;


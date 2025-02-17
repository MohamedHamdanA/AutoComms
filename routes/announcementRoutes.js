import express from 'express';
import { createAnnouncement } from '../controllers/announcementController.js';

const router = express.Router();

router.post('/', createAnnouncement);


export default router;
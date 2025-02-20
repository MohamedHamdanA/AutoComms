import express from 'express';
import { scheduleVideoUpload, upload } from '../controllers/youtubeController.js';

const router = express.Router();

// ✅ Schedule Video Upload
router.post('/upload', upload.single('video'), scheduleVideoUpload);

export default router;

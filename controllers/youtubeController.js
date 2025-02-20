import { google } from 'googleapis';
import pool from '../config/db.js';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import schedule from 'node-schedule';

// ✅ Configure Multer for video uploads
const storage = multer.diskStorage({
    destination: './uploads/', // Make sure this folder exists
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
export const upload = multer({ storage });

// ✅ Fetch user YouTube tokens from database
async function getYouTubeTokens(userId) {
    const result = await pool.query(
        `SELECT access_token, refresh_token FROM users WHERE user_id = $1`,
        [userId]
    );
    return result.rows[0];
}

// ✅ Upload Video to YouTube
async function uploadToYouTube(videoPath, title, description, privacyStatus, userId) {
    try {
        const tokens = await getYouTubeTokens(userId);
        if (!tokens) {
            console.log("❌ No YouTube account linked for this user.");
            return null;
        }

        const auth = new google.auth.OAuth2();
        auth.setCredentials({
            access_token: tokens.access_token,
            refresh_token: tokens.refresh_token
        });

        const youtube = google.youtube({ version: "v3", auth });

        const response = await youtube.videos.insert({
            part: "snippet,status",
            requestBody: {
                snippet: { title, description, categoryId: "22" }, // "22" = People & Blogs
                status: { privacyStatus }
            },
            media: { body: fs.createReadStream(videoPath) }
        });

        console.log(`✅ Video Uploaded: ${response.data.id}`);
        return response.data.id;
    } catch (error) {
        console.error("❌ YouTube Upload Error:", error);
        return null;
    }
}

// ✅ Store and Schedule Video Upload
export const scheduleVideoUpload = async (req, res) => {
    const { title, description, privacyStatus, scheduledTime } = req.body;
    const { userId } = req.cookies;
    const videoPath = req.file.path;

    if (!userId) return res.status(401).json({ error: "User not authenticated" });

    try {
        // ✅ Store video details in `youtube_videos` table
        const result = await pool.query(
            `INSERT INTO youtube_videos (user_id, video_path, title, description, privacy_status, scheduled_time)
             VALUES ($1, $2, $3, $4, $5, $6) RETURNING id;`,
            [userId, videoPath, title, description, privacyStatus, scheduledTime]
        );

        const videoId = result.rows[0].id;

        // ✅ Schedule Upload
        schedule.scheduleJob(new Date(scheduledTime), async () => {
            const youtubeVideoId = await uploadToYouTube(videoPath, title, description, privacyStatus, userId);
            if (youtubeVideoId) {
                await pool.query(
                    `UPDATE youtube_videos SET uploaded = TRUE, youtube_video_id = $1 WHERE id = $2`,
                    [youtubeVideoId, videoId]
                );
                console.log(`📅 Scheduled Video Uploaded: ${youtubeVideoId}`);
            }
        });

        res.status(200).json({ message: "✅ Video scheduled successfully!" });
    } catch (error) {
        console.error("❌ Scheduling Error:", error);
        res.status(500).json({ error: "Failed to schedule video upload" });
    }
};

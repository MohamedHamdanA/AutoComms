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

async function getYouTubeTokens(userId) {
    const result = await pool.query(
        `SELECT access_token, refresh_token FROM users WHERE user_id = $1`,
        [userId]
    );
    const tokens = result.rows[0];

    if (!tokens) return null;

    const auth = new google.auth.OAuth2(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET,
        process.env.GOOGLE_REDIRECT_URI
    );
    auth.setCredentials({
        access_token: tokens.access_token,
        refresh_token: tokens.refresh_token
    });

    // 🔄 **Check and Refresh Token if Expired**
    const newTokens = await auth.getAccessToken();
    if (newTokens.res) {
        await pool.query(
            `UPDATE users SET access_token = $1 WHERE user_id = $2`,
            [newTokens.res.data.access_token, userId]
        );
        auth.setCredentials({ access_token: newTokens.res.data.access_token });
    }

    return auth;
}


// ✅ Upload Video to YouTube
async function uploadToYouTube(videoPath, title, description, privacyStatus, userId) {
    try {
        const auth = await getYouTubeTokens(userId);
        if (!auth) {
            console.log("❌ No valid YouTube tokens found.");
            return null;
        }

        const youtube = google.youtube({ version: "v3", auth });

        const response = await youtube.videos.insert({
            part: "snippet,status",
            requestBody: {
                snippet: { title, description, categoryId: "22" },
                status: { privacyStatus }
            },
            media: { body: fs.createReadStream(videoPath) }
        });

        console.log(`✅ Video Uploaded: ${response.data.id}`);
        return response.data.id;
    } catch (error) {
        console.error("❌ YouTube Upload Error:", error.response ? error.response.data : error);
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
        const userAccount = await pool.query(
            `SELECT email FROM users WHERE user_id = $1 LIMIT 1`,
            [userId]
        );

        if (userAccount.rowCount === 0) {
            return res.status(400).json({ error: "No linked YouTube account found" });
        }

        const youtubeEmail = userAccount.rows[0].email;

        const result = await pool.query(
            `INSERT INTO youtube_videos (user_id, youtube_email, video_path, title, description, privacy_status, scheduled_time)
             VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id;`,
            [userId, youtubeEmail, videoPath, title, description, "public", scheduledTime]
        );

        const videoId = result.rows[0].id;

        // ✅ Ensure `scheduledTime` is a valid date
        const scheduleDate = new Date(scheduledTime);
        if (isNaN(scheduleDate)) {
            console.error("❌ Invalid date format:", scheduledTime);
            return res.status(400).json({ error: "Invalid scheduled time format" });
        }

        console.log("✅ Scheduling video upload for:", scheduleDate.toISOString());

        schedule.scheduleJob(scheduleDate, async () => {
            console.log("⏳ Attempting to upload video now...");
            const uploadedVideoId = await uploadToYouTube(videoPath, title, description, privacyStatus || "public", userId);
            
            if (uploadedVideoId) {
                await pool.query(`UPDATE youtube_videos SET uploaded = TRUE, youtube_video_id = $1 WHERE id = $2`, [uploadedVideoId, videoId]);
                console.log("✅ Video successfully uploaded:", uploadedVideoId);
            } else {
                console.log("❌ Upload failed.");
            }
        });

        res.status(200).json({ message: "Video scheduled for upload" });
    } catch (error) {
        console.error("❌ Scheduling Error:", error);
        res.status(500).json({ error: "Failed to schedule video upload" });
    }
};



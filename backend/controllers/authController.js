import { google } from 'googleapis';
import pool from '../config/db.js';
import {oauth2Client, AUTH_URL} from '../config/UserGoogleClient.js';
import { randomBytes } from 'crypto';
import { storeSession, deleteSession } from './sessionService.js';

// ✅ Generate a secure random token
function generateRandomToken() {
  return randomBytes(32).toString('hex');
}

// ✅ Set expiration time for session (24 hours)
function getExpirationTime() {
  return new Date(Date.now() + 24 * 60 * 60 * 1000);
}

// ✅ Store OAuth tokens for Gmail API usage
async function storeTeacherTokens(userId, tokens) {
  const query = `
    UPDATE users 
    SET access_token = $1, refresh_token = $2 
    WHERE user_id = $3;
  `;
  await pool.query(query, [tokens.access_token, tokens.refresh_token, userId]);
}

// ✅ Retrieve stored tokens
async function getTeacherTokens(userId) {
  const result = await pool.query(
    `SELECT access_token, refresh_token FROM users WHERE user_id = $1;`,
    [userId]
  );
  return result.rows[0];
}

const AuthController = {
  /**
   * 🚀 1️⃣ Redirect User to Google OAuth2
   */
  googleAuth: (req, res) => {
    // const authUrl = oauth2Client.generateAuthUrl({
    //   access_type: 'offline',
    //   scope: [
    //     'profile',
    //     'email',
    //     'https://www.googleapis.com/auth/gmail.send', // Gmail API scope
    //     'https://www.googleapis.com/auth/forms.responses.readonly'
    //   ],
    //   prompt: 'consent',
    // });
    res.redirect(AUTH_URL);
  },

  /**
   * 🟢 2️⃣ Handle Google OAuth2 Callback
   */
  googleAuthCallback: async (req, res) => {
    const { code } = req.query;

    if (!code) {
      return res.status(400).json({ error: 'Authorization code is missing' });
    }

    try {
      // 📥 Exchange code for tokens
      const { tokens } = await oauth2Client.getToken(code);
      oauth2Client.setCredentials(tokens);

      // 🧑 Get user profile from Google
      const oauth2 = google.oauth2({ version: 'v2', auth: oauth2Client });
      const { data: googleUser } = await oauth2.userinfo.get();

      // 📤 Insert or update user in database
      const userQuery = `
        INSERT INTO users (name, email, google_id, access_token, refresh_token) 
        VALUES ($1, $2, $3, $4, $5) 
        ON CONFLICT (email) DO UPDATE 
        SET google_id = EXCLUDED.google_id,
            access_token = EXCLUDED.access_token,
            refresh_token = EXCLUDED.refresh_token
        RETURNING *;
      `;
      const values = [
        googleUser.name,
        googleUser.email,
        googleUser.id,
        tokens.access_token,
        tokens.refresh_token
      ];
      const { rows } = await pool.query(userQuery, values);
      const user = rows[0];

      // ✅ Store session & CSRF token
      const sessionID = generateRandomToken();
      const csrfToken = generateRandomToken();
      const expiresAt = getExpirationTime();

      await storeSession(sessionID, user.user_id, csrfToken, expiresAt);

      // ✅ Set secure cookies
      res.cookie('sessionID', sessionID, { httpOnly: true, secure: true, sameSite: 'Strict', maxAge: 24 * 60 * 60 * 1000 });
      res.cookie('csrfToken', csrfToken, { secure: true, sameSite: 'Strict', maxAge: 24 * 60 * 60 * 1000 });
      res.cookie('userId', user.user_id, { httpOnly: true, secure: true, sameSite: 'Strict', maxAge: 24 * 60 * 60 * 1000 });
      
      res.redirect("http://localhost:5173/");
    } catch (error) {
      console.error('Google login error:', error);
      res.status(500).json({ error: 'Google login failed. Please try again.' });
    }
  },

  /**
   * 🚪 3️⃣ Handle User Signout
   */
  signout: async (req, res) => {
    try {
      const sessionID = req.cookies.sessionID;

      if (!sessionID) {
        return res.status(401).json({ error: 'No active session found' });
      }
      // 🗑️ Delete session from database
      await deleteSession(sessionID);
      
      // 🧹 Clear cookies
      res.clearCookie('sessionID');
      res.clearCookie('csrfToken');
      res.clearCookie('userId');

      res.status(200).json({ message: 'Signout successful' });
    } catch (error) {
      console.error('Signout error:', error);
      res.status(500).json({ error: 'Signout failed. Please try again.' });
    }
  },
};

export default AuthController;

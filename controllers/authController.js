import pool from '../config/db.js';
import oauth2Client from '../config/googleClient.js';
import { randomBytes } from 'crypto';
import { storeSession, deleteSession } from './sessionService.js';
import { google } from 'googleapis';

function generateRandomToken() {
  return randomBytes(16).toString('hex');
}

function getExpirationTime() {
  return new Date(Date.now() + 24 * 60 * 60 * 1000);
}

const AuthController = {
  // Redirect to Google OAuth2 consent screen
  googleAuth: (req, res) => {
    const authUrl = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: ['profile', 'email'],
    });
    res.redirect(authUrl);
  },

  // Handle OAuth2 callback
  googleAuthCallback: async (req, res) => {
    const code = req.query.code;

    try {
      // Exchange code for tokens
      const { tokens } = await oauth2Client.getToken(code);
      oauth2Client.setCredentials(tokens);

      // Get user info from Google
      const oauth2 = google.oauth2({ auth: oauth2Client, version: 'v2' });
      const { data: googleUser } = await oauth2.userinfo.get();

      // Check if user exists in the database
      let user = await pool.query('SELECT * FROM users WHERE email = $1', [googleUser.email]);

      if (user.rows.length === 0) {
        // Create a new user
        user = await pool.query(
          'INSERT INTO users (name, email, google_id) VALUES ($1, $2, $3) RETURNING *',
          [googleUser.name, googleUser.email, googleUser.id]
        );
      } else {
        user = user.rows[0];
      }

      // Create session and CSRF token
      const sessionID = generateRandomToken();
      const csrfToken = generateRandomToken();
      const expiresAt = getExpirationTime();

      await storeSession(sessionID, user.user_id, csrfToken, expiresAt);

      // Set cookies for session management
      res.cookie('sessionID', sessionID, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
      res.cookie('csrfToken', csrfToken, { maxAge: 30 * 60 * 1000 });
      res.cookie('userId', user.user_id);

      res.status(200).json({message: 'Login Successfull'});
    } catch (error) {
      console.error('Error during Google login:', error);
      res.status(500).json({ error: 'Google login failed' });
    }
  },

  signout: async (req, res) => {
    try {
      const sessionID = req.cookies.sessionID;
      if (sessionID) {
        await deleteSession(sessionID);
        res.clearCookie('sessionID');
        res.clearCookie('csrfToken');
        res.clearCookie('userId');
      }
      res.status(200).json({ message: 'Signout successful' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Signout failed' });
    }
  },
};

export default AuthController;

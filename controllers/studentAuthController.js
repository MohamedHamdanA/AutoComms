import pool from '../config/db.js';
import { oauth2Client, AUTH_URL } from '../config/studentGoogleClient.js';
import { randomBytes } from 'crypto';
import { storeSession, deleteSession } from './stuSessionService.js';
import { google } from 'googleapis';

function generateRandomToken() {
  return randomBytes(32).toString('hex');
}

function getExpirationTime() {
  return new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
}

const StudentAuthController = {
  /**
   * Redirects student to Google OAuth2 login page.
   */
  googleAuth: (req, res) => {
    res.redirect(AUTH_URL);
  },

  /**
   * Handles Google OAuth2 Callback and authenticates student.
   * Instead of redirecting, it returns JSON so that the extension can handle the response.
   */
  googleAuthCallback: async (req, res) => {
    const { code } = req.query;
    if (!code) {
      return res.status(400).json({ error: 'Authorization code is missing' });
    }

    try {
      // Exchange code for tokens.
      const { tokens } = await oauth2Client.getToken(code);
      oauth2Client.setCredentials(tokens);

      // Fetch student info from Google.
      const oauth2 = google.oauth2({ auth: oauth2Client, version: 'v2' });
      const { data: googleStudent } = await oauth2.userinfo.get();

      // Upsert student into the database.
      const studentQuery = `
        INSERT INTO students (name, email, google_id)
        VALUES ($1, $2, $3)
        ON CONFLICT (email) DO UPDATE
        SET google_id = EXCLUDED.google_id
        RETURNING *;
      `;
      const values = [googleStudent.name, googleStudent.email, googleStudent.id];
      const { rows } = await pool.query(studentQuery, values);
      const student = rows[0];

      // Create session and CSRF token.
      const sessionID = generateRandomToken();
      const csrfToken = generateRandomToken();
      const expiresAt = getExpirationTime();

      await storeSession(sessionID, student.student_id, csrfToken, expiresAt);

      // Set cookies (for local development, omit secure flag).
      const cookieOptions = {
        httpOnly: true,
        sameSite: 'Strict',
        maxAge: 24 * 60 * 60 * 1000,
      };

      res.cookie('studentSessionID', sessionID, cookieOptions);
      res.cookie('studentCsrfToken', csrfToken, { ...cookieOptions, maxAge: 30 * 60 * 1000 });
      res.cookie('studentId', student.student_id, cookieOptions);


      console.log("student cookies setted");
      // Return JSON response for the extension to handle.
      res.status(200).json({
        message: 'Login Successful',
        student: { name: student.name, email: student.email }
      });
    } catch (error) {
      console.error('Google login error:', error);
      res.status(500).json({ error: 'Google login failed. Please try again.' });
    }
  },

  /**
   * Signs out the student and clears session cookies.
   */
  signout: async (req, res) => {
    try {
      const sessionID = req.cookies.studentSessionID;
      if (!sessionID) {
        return res.status(401).json({ error: 'No active session found' });
      }
      await deleteSession(sessionID);
      res.clearCookie('studentSessionID');
      res.clearCookie('studentCsrfToken');
      res.clearCookie('studentId');

      res.status(200).json({ message: 'Signout successful' });
    } catch (error) {
      console.error('Signout error:', error);
      res.status(500).json({ error: 'Signout failed. Please try again.' });
    }
  },
};

export default StudentAuthController;

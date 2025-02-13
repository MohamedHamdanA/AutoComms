import { google } from 'googleapis';
import pool from '../config/db.js';
import { oauth2Client } from '../config/UserGoogleClient.js';

async function getTeacherTokens(userId) {
  const result = await pool.query(
    `SELECT access_token, refresh_token FROM users WHERE user_id = $1`,
    [userId]
  );
  return result.rows[0];
}

async function sendEmail(userId, to, subject, body) {
  const tokens = await getTeacherTokens(userId);
  if (!tokens) throw new Error('No tokens found for user');

  oauth2Client.setCredentials({
    access_token: tokens.access_token,
    refresh_token: tokens.refresh_token
  });

  const gmail = google.gmail({ version: 'v1', auth: oauth2Client });

  const email = [
    `To: ${to}`,
    'Content-Type: text/html; charset=utf-8',
    `Subject: ${subject}`,
    '',
    body
  ].join('\n');

  const encodedMessage = Buffer.from(email).toString('base64').replace(/\+/g, '-').replace(/\//g, '_');

  const result = await gmail.users.messages.send({
    userId: 'me',
    requestBody: {
      raw: encodedMessage
    }
  });

  return result.data;
}

export { sendEmail };

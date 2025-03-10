import { google } from 'googleapis';
import dotenv from 'dotenv';

dotenv.config();

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI_STUDENT
);

// Add Google Forms API and Gmail API scopes
const AUTH_URL = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: [
    'https://www.googleapis.com/auth/userinfo.profile',    // For login
    'https://www.googleapis.com/auth/userinfo.email',      // For email access
  ],
  prompt: 'consent'
});

export { oauth2Client, AUTH_URL };

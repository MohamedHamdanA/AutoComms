// googleFormsService.js
import { google } from 'googleapis';
import { JWT } from 'google-auth-library';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

export async function getGoogleFormsAPI() {
  const keyFilePath = path.join(process.cwd(), 'config/service-account.json'); // Adjust the path if needed

  // Create a JWT client with domain-wide delegation
  const auth = new JWT({
    keyFile: keyFilePath,
    scopes: ['https://www.googleapis.com/auth/forms.responses.readonly'],
    subject: process.env.ADMIN_EMAIL,  // e.g., admin@chennai.net or any teacher's email in the domain
  });
  
  return google.forms({ version: 'v1', auth });
}

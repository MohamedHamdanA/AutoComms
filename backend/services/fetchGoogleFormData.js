import { google } from 'googleapis';
import { oauth2Client } from '../config/UserGoogleClient.js';
/**
 * Searches for a spreadsheet that is likely linked to the form based on its title.
 *
 * @param {string} accessToken - The user's OAuth2 access token (with Drive scope).
 * @param {string} formTitle - The title of the form to help identify the spreadsheet.
 * @returns {Promise<string|null>} - Returns the spreadsheet id if found, otherwise null.
 */
export async function getLinkedSpreadsheetId(accessToken, formTitle) {
  // Initialize Drive API client with the access token.
  oauth2Client.setCredentials({ access_token: accessToken });
  const drive = google.drive({ version: 'v3', auth: oauth2Client });
  
  // Construct a query to search for spreadsheets that have the form title and "responses" in the name.
  const query = `mimeType='application/vnd.google-apps.spreadsheet' and name contains '${formTitle}' and name contains 'responses'`;
  const res = await drive.files.list({
    q: query,
    fields: 'files(id, name)',
    spaces: 'drive'
  });
  
  if (res.data.files && res.data.files.length > 0) {
    // Assuming the first match is the linked spreadsheet.
    return res.data.files[0].id;
  }
  return null;
}


/**
 * Fetches form responses from the linked spreadsheet.
 *
 * @param {string} accessToken - The user's OAuth2 access token.
 * @param {string} spreadsheetId - The id of the spreadsheet containing the responses.
 * @param {string} range - The range in the spreadsheet where responses are stored (e.g., "Form responses 1!A:Z").
 * @returns {Promise<Object>} - The spreadsheet data.
 */
export async function fetchSpreadsheetResponses(accessToken, spreadsheetId, range = 'Form responses 1!A:Z') {
  oauth2Client.setCredentials({ access_token: accessToken });
  const sheets = google.sheets({ version: 'v4', auth: oauth2Client });
  
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range,
  });
  return response.data;
}


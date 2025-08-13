import pool from '../config/db.js';
import { oauth2Client, AUTH_URL } from '../config/studentGoogleClient.js';
import { randomBytes } from 'crypto';
import { storeSession, deleteSession } from './stuSessionService.js';
import { google } from 'googleapis';

function generateRandomToken() {
  return randomBytes(32).toString('hex');
}

function getExpirationTime() {
  return new Date(Date.now() + 24 * 60 * 60 * 1000);
}

const StudentAuthController = {
  googleAuth: (req, res) => res.redirect(AUTH_URL),

  googleAuthCallback: async (req, res) => {
    const { code } = req.query;
    if (!code) return res.status(400).json({ error: 'Authorization code is missing' });

    try {
      const { tokens } = await oauth2Client.getToken(code);
      oauth2Client.setCredentials(tokens);
      const oauth2 = google.oauth2({ auth: oauth2Client, version: 'v2' });
      const { data: googleStudent } = await oauth2.userinfo.get();

      const studentQuery = `
        INSERT INTO students (email, google_id)
        VALUES ($1, $2)
        ON CONFLICT (email) DO UPDATE SET google_id = EXCLUDED.google_id
        RETURNING *;
      `;
      const values = [googleStudent.email, googleStudent.id];
      const { rows } = await pool.query(studentQuery, values);
      const student = rows[0];

      const sessionID = generateRandomToken();
      const csrfToken = generateRandomToken();
      const expiresAt = getExpirationTime();
      await storeSession(sessionID, student.student_id, csrfToken, expiresAt);
      const cookieOptions = {
        httpOnly: false,
        sameSite: 'Lax',
        maxAge: 24 * 60 * 60 * 1000,
        secure: false,
      };
      res.cookie('studentSessionID', sessionID, cookieOptions);
      res.cookie('studentCsrfToken', csrfToken, { ...cookieOptions, maxAge: 30 * 60 * 1000 });
      res.cookie('studentId', student.student_id, cookieOptions);
      // Instead of setting cookies, redirect to close-window.html with session data
      const redirectUrl = `http://localhost:5000/close-window.html?sessionID=${encodeURIComponent(sessionID)}&csrfToken=${encodeURIComponent(csrfToken)}&studentId=${encodeURIComponent(student.student_id)}`;
      res.redirect(redirectUrl);
    } catch (error) {
      console.error('Google login error:', error);
      res.status(500).json({ error: 'Google login failed. Please try again.' });
    }
  },

  signout: async (req, res) => {
    try {
      const sessionID = req.cookies.studentSessionID;
      if (!sessionID) return res.status(401).json({ error: 'No active session found' });
      await deleteSession(sessionID);
      ['studentSessionID', 'studentCsrfToken', 'studentId'].forEach(cookie => res.clearCookie(cookie));
      res.status(200).json({ message: 'Signout successful' });
    } catch (error) {
      console.error('Signout error:', error);
      res.status(500).json({ error: 'Signout failed. Please try again.' });
    }
  }
};

export default StudentAuthController;

// import pool from '../config/db.js';
// import { oauth2Client, AUTH_URL } from '../config/studentGoogleClient.js';
// import { randomBytes } from 'crypto';
// import { storeSession, deleteSession } from './stuSessionService.js';
// import { google } from 'googleapis';

// function generateRandomToken() {
//   return randomBytes(32).toString('hex');
// }

// function getExpirationTime() {
//   return new Date(Date.now() + 24 * 60 * 60 * 1000);
// }

// const StudentAuthController = {
//   googleAuth: (req, res) => res.redirect(AUTH_URL),

//   googleAuthCallback: async (req, res) => {
//     const { code } = req.query;
//     if (!code) return res.status(400).json({ error: 'Authorization code is missing' });

//     try {
//       const { tokens } = await oauth2Client.getToken(code);
//       oauth2Client.setCredentials(tokens);
//       const oauth2 = google.oauth2({ auth: oauth2Client, version: 'v2' });
//       const { data: googleStudent } = await oauth2.userinfo.get();

//       const studentQuery = `
//         INSERT INTO students (email, google_id)
//         VALUES ($1, $2)
//         ON CONFLICT (email) DO UPDATE SET google_id = EXCLUDED.google_id
//         RETURNING *;
//       `;
//       const values = [googleStudent.email, googleStudent.id];
//       const { rows } = await pool.query(studentQuery, values);
//       const student = rows[0];

//       const sessionID = generateRandomToken();
//       const csrfToken = generateRandomToken();
//       const expiresAt = getExpirationTime();
//       await storeSession(sessionID, student.student_id, csrfToken, expiresAt);

//       const cookieOptions = {
//         httpOnly: false,
//         sameSite: 'Lax',
//         maxAge: 24 * 60 * 60 * 1000,
//         secure: false,
//       };
//       res.cookie('studentSessionID', sessionID, cookieOptions);
//       res.cookie('studentCsrfToken', csrfToken, { ...cookieOptions, maxAge: 30 * 60 * 1000 });
//       res.cookie('studentId', student.student_id, cookieOptions);

//       // Remove cookie-setting code and send tokens in JSON
//       res.status(200).json({
//         message: 'Login Successful',
//         student: { name: student.name, email: student.email },
//         studentId:student.student_id,
//         sessionID,
//         csrfToken
//       });
//     } catch (error) {
//       console.error('Google login error:', error);
//       res.status(500).json({ error: 'Google login failed. Please try again.' });
//     }
//   },

//   signout: async (req, res) => {
//     try {
//       const sessionID = req.cookies.studentSessionID;
//       if (!sessionID) return res.status(401).json({ error: 'No active session found' });
//       await deleteSession(sessionID);
//       ['studentSessionID', 'studentCsrfToken', 'studentId'].forEach(cookie => res.clearCookie(cookie));
//       res.status(200).json({ message: 'Signout successful' });
//     } catch (error) {
//       console.error('Signout error:', error);
//       res.status(500).json({ error: 'Signout failed. Please try again.' });
//     }
//   }
// };

// export default StudentAuthController;

// import pool from '../config/db.js';
// import { oauth2Client, AUTH_URL } from '../config/studentGoogleClient.js';
// import { randomBytes } from 'crypto';
// import { storeSession, deleteSession } from './stuSessionService.js';
// import { google } from 'googleapis';

// function generateRandomToken() {
//   return randomBytes(32).toString('hex');
// }

// function getExpirationTime() {
//   return new Date(Date.now() + 24 * 60 * 60 * 1000);
// }

// const StudentAuthController = {
//   googleAuth: (req, res) => res.redirect(AUTH_URL),

//   googleAuthCallback: async (req, res) => {
//     const { code } = req.query;
//     if (!code) {
//       return res.send(`
//         <script>
//           alert('Authorization code is missing');
//           window.close();
//         </script>
//       `);
//     }

//     try {
//       // Get tokens from Google
//       const { tokens } = await oauth2Client.getToken(code);
//       oauth2Client.setCredentials(tokens);

//       // Get student info from Google
//       const oauth2 = google.oauth2({ auth: oauth2Client, version: 'v2' });
//       const { data: googleStudent } = await oauth2.userinfo.get();

//       // Insert or update student in database
//       const studentQuery = `
//         INSERT INTO students (email, google_id)
//         VALUES ($1, $2)
//         ON CONFLICT (email) DO UPDATE SET google_id = EXCLUDED.google_id
//         RETURNING *;
//       `;
//       const values = [googleStudent.email, googleStudent.id];
//       const { rows } = await pool.query(studentQuery, values);
//       const student = rows[0];

//       // Generate session
//       const sessionID = generateRandomToken();
//       const csrfToken = generateRandomToken();
//       const expiresAt = getExpirationTime();
//       await storeSession(sessionID, student.student_id, csrfToken, expiresAt);

//       // Set cookies
//       const cookieOptions = {
//         httpOnly: true,
//         sameSite: 'Strict',
//         maxAge: 24 * 60 * 60 * 1000,
//       };
//       res.cookie('studentSessionID', sessionID, cookieOptions);
//       res.cookie('studentCsrfToken', csrfToken, { ...cookieOptions, maxAge: 30 * 60 * 1000 });
//       res.cookie('studentId', student.student_id, cookieOptions);

//       // Send back data and close window for extension
//       res.send(`
//         <script>
//           const studentData = {
//             sessionID: "${sessionID}",
//             csrfToken: "${csrfToken}",
//             student: ${JSON.stringify({
//               name: student.name,
//               email: student.email,
//             })}
//           };
//           window.opener.postMessage(studentData, "*");
//           window.close();
//         </script>
//       `);
//     } catch (error) {
//       console.error('Google login error:', error);
//       res.send(`
//         <script>
//           alert('Google login failed. Please try again.');
//           window.close();
//         </script>
//       `);
//     }
//   },

//   signout: async (req, res) => {
//     try {
//       const sessionID = req.cookies.studentSessionID;
//       if (!sessionID) return res.status(401).json({ error: 'No active session found' });

//       // Delete session from database
//       await deleteSession(sessionID);

//       // Clear cookies
//       ['studentSessionID', 'studentCsrfToken', 'studentId'].forEach(cookie =>
//         res.clearCookie(cookie)
//       );

//       res.status(200).json({ message: 'Signout successful' });
//     } catch (error) {
//       console.error('Signout error:', error);
//       res.status(500).json({ error: 'Signout failed. Please try again.' });
//     }
//   },
// };

// export default StudentAuthController;

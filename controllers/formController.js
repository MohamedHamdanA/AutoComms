// controllers/formController.js
import { google } from 'googleapis';
import pool from '../config/db.js';
import { sendEmail } from '../services/emailServices.js';
import { oauth2Client } from '../config/UserGoogleClient.js';
import axios from 'axios';
import { getLinkedSpreadsheetId, fetchSpreadsheetResponses } from '../services/fetchGoogleFormData.js';

/**
 * Create a Google Form record in the database and send notifications to students.
 */
export async function createGoogleForm(req, res) {
  const { userId } = req.cookies; // Teacher's ID
  const { classId, formTitle, description, formLink, dueDate } = req.body;

  try {
    // Insert form into database
    const formResult = await pool.query(
      `INSERT INTO google_forms (class_id, form_title, description, form_link, due_date) 
       VALUES ($1, $2, $3, $4, $5) 
       RETURNING form_id;`,
      [classId, formTitle, description, formLink, dueDate]
    );

    const formId = formResult.rows[0].form_id;

    // Get student emails from the class
    const students = await pool.query(
      `SELECT s.email 
       FROM students s
       JOIN class_students cs ON s.student_id = cs.student_id
       WHERE cs.class_id = $1;`,
      [classId]
    );

    // Send email to all students
    const subject = `New Google Form: ${formTitle}`;
    const body = `
      <p>Hello,</p>
      <p>A new Google Form has been assigned:</p>
      <p><strong>${formTitle}</strong></p>
      <p><a href="${formLink}">Click here to fill out the form</a></p>
      <p>Due Date: ${dueDate}</p>
      <p>Thank you!</p>
    `;

    for (const student of students.rows) {
      await sendEmail(userId, student.email, subject, body);
    }
    console.log("Mail sent success");
    res.status(201).json({ message: 'Form created and students notified!' });
  } catch (error) {
    console.error('Error creating form or sending emails:', error);
    res.status(500).json({ error: 'Failed to create form or send notifications' });
  }
}

/**
 * Fetch the responses for a Google Form using the teacher's access token,
 * and compare them with the students enrolled in a given class.
 *
 * Expected route: GET /api/google-form/responses/:classId/:formId
 * Here, :formId is the database primary key for the google_forms record.
 */
export async function getFormResponses(req, res) {
  const { classId, formId } = req.params;
  const { userId } = req.cookies;
  // (Retrieve form record and extract formTitle and formLink from your DB)
  const formRecord = await pool.query(
    `SELECT form_title, form_link FROM google_forms WHERE form_id = $1 AND class_id = $2`,
    [formId, classId]
  );
  if (formRecord.rowCount === 0) {
    return res.status(404).json({ error: "Google Form record not found" });
  }
  const { form_title: formTitle } = formRecord.rows[0];

  // Retrieve teacher's access token from the database.
  const tokens = await pool.query(`SELECT access_token FROM users WHERE user_id = $1`, [userId]);
  if (!tokens.rows[0]?.access_token) {
    return res.status(401).json({ error: 'Unauthorized - No access token' });
  }
  const accessToken = tokens.rows[0].access_token;

  // Attempt to get the linked spreadsheet id programmatically.
  const spreadsheetId = await getLinkedSpreadsheetId(accessToken, formTitle);
  if (!spreadsheetId) {
    return res.status(404).json({ error: 'Linked spreadsheet not found. Ensure that form responses are linked to a spreadsheet.' });
  }

  // Fetch responses from the spreadsheet.
  try {
    const sheetData = await fetchSpreadsheetResponses(accessToken, spreadsheetId);
    console.log("resonse", sheetData);

    // 1️⃣ Extract response emails dynamically (last column)
const responseEmails = sheetData.values
.slice(1) // Skip the header row
.map(row => row[row.length - 1]) // Get the last element (email)
.filter(email => email !== undefined); // Remove undefined values

// 2️⃣ Fetch all students enrolled in the specified class
const students = await pool.query(
`SELECT s.student_id, s.email 
 FROM students s
 JOIN class_students cs ON s.student_id = cs.student_id
 WHERE cs.class_id = $1;`,
[classId]
);

// 3️⃣ Initialize Yes/No counters
let completedCount = 0;
let notCompletedCount = 0;

// 4️⃣ Compare student emails against form responses
const completionStatus = students.rows.map(student => {
const isCompleted = responseEmails.includes(student.email);
if (isCompleted) completedCount++;
else notCompletedCount++;

return {
  student_id: student.student_id,
  email: student.email,
  completed: isCompleted ? "Yes" : "No"
};
});

// 5️⃣ Return the response including Yes/No count
res.status(200).json({ 
total_students: students.rowCount,
responses: responseEmails.length,
completed_count: completedCount,  // ✅ Count of students who completed the form
not_completed_count: notCompletedCount,  // ✅ Count of students who did not complete the form
completion_status: completionStatus
});


  } catch (error) {
    console.error('Error fetching spreadsheet responses:', error);
    res.status(500).json({ error: 'Failed to fetch spreadsheet responses' });
  }
}

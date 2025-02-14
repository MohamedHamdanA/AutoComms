// controllers/formController.js
import { google } from 'googleapis';
import pool from '../config/db.js';
import { sendEmail } from '../services/emailServices.js';
import { oauth2Client } from '../config/UserGoogleClient.js';

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

    res.status(201).json({ message: 'Form created and students notified!' });
  } catch (error) {
    console.error('Error creating form or sending emails:', error);
    res.status(500).json({ error: 'Failed to create form or send notifications' });
  }
}

/**
 * Fetch the responses for a Google Form using the teacher's access token,
 * and compare them with the students enrolled in a given class.
 */
export async function getFormResponses(req, res) {
  const { formId } = req.params;
  const { classId } = req.query;
  const { userId } = req.cookies;

  if (!classId) {
    return res.status(400).json({ error: "classId query parameter is required" });
  }

  try {
    // Get teacher's access token from the database
    const tokens = await pool.query(
      `SELECT access_token FROM users WHERE user_id = $1`,
      [userId]
    );
    
    if (!tokens.rows[0]?.access_token) {
      return res.status(401).json({ error: 'Unauthorized - No access token' });
    }

    // Set credentials and initialize the Google Forms API client
    oauth2Client.setCredentials({ access_token: tokens.rows[0].access_token });
    const forms = google.forms({ version: 'v1', auth: oauth2Client });

    // Fetch responses from the Google Form
    const response = await forms.forms.responses.list({
      formId,
      pageSize: 100,
    });
    const responses = response.data.responses || [];

    // Fetch all students enrolled in the specified class
    const students = await pool.query(
      `SELECT s.student_id, s.email 
       FROM students s
       JOIN class_students cs ON s.student_id = cs.student_id
       WHERE cs.class_id = $1;`,
      [classId]
    );

    // Compare student emails against the responses
    const responseEmails = responses.map(r => r.respondentEmail);
    const completionStatus = students.rows.map(student => ({
      student_id: student.student_id,
      email: student.email,
      completed: responseEmails.includes(student.email) ? "Yes" : "No"
    }));

    res.status(200).json({ 
      total_students: students.rowCount,
      responses: responses.length,
      completion_status: completionStatus
    });
  } catch (error) {
    console.error('Error fetching form responses:', error);
    res.status(500).json({ error: 'Failed to fetch form responses' });
  }
}

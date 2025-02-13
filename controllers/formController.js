import express from 'express';
import pool from '../config/db.js';
import { sendEmail } from '../services/emailServices.js';

const router = express.Router();

// Create Google Form and Notify Students
router.post('/create', async (req, res) => {
  const { userId } = req.cookies; // Teacher's ID
  const { classId, formTitle, description, formLink, dueDate } = req.body;

  try {
    // Insert form into database
    const formResult = await pool.query(`
      INSERT INTO google_forms (class_id, form_title, description, form_link, due_date) 
      VALUES ($1, $2, $3, $4, $5) 
      RETURNING form_id;
    `, [classId, formTitle, description, formLink, dueDate]);

    const formId = formResult.rows[0].form_id;

    // Get student emails from the class
    const students = await pool.query(`
      SELECT s.email 
      FROM students s
      JOIN class_students cs ON s.student_id = cs.student_id
      WHERE cs.class_id = $1;
    `, [classId]);

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
});

export default router;

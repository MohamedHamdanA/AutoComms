import { google } from 'googleapis';
import pool from '../config/db.js';
import { sendEmail } from '../services/emailServices.js';
import { oauth2Client } from '../config/UserGoogleClient.js';

export async function createAnnouncement(req, res) {
    const { userId } = req.cookies; // Teacher's ID
    const { classId, formTitle, description } = req.body;
  
    try {
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
        <p>${description}</p>
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
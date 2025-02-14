import { google } from 'googleapis';
import pool from '../config/db.js';
import { getGoogleFormsAPI } from '../services/googleFormsService.js';

/**
 * Get all Google Forms assigned to a student and their submission status.
 * Uses a service account to fetch teacher-created form responses.
 */
export async function getStudentForms(req, res) {
  const studentId = req.params.studentId;

  try {
    // 1. Fetch the student's email from the database.
    const studentResult = await pool.query(
      'SELECT email FROM students WHERE student_id = $1',
      [studentId]
    );
    if (studentResult.rows.length === 0) {
      return res.status(404).json({ error: 'Student not found' });
    }
    const studentEmail = studentResult.rows[0].email;

    // 2. Fetch all forms assigned to the student's classes.
    const formsResult = await pool.query(
      `SELECT gf.form_id, gf.form_title, gf.form_link
       FROM google_forms gf
       JOIN class_students cs ON gf.class_id = cs.class_id
       WHERE cs.student_id = $1`,
      [studentId]
    );

    // 3. Use the service account to get the Google Forms API client.
    const formsAPI = await getGoogleFormsAPI();
    const formsWithStatus = [];

    // 4. For each form, check if the student’s email appears in the form responses.
    for (const form of formsResult.rows) {
      const formId = form.form_id.toString(); 
      try {
        const response = await formsAPI.forms.responses.list({
          formId: formId,
        });
        const responses = response.data.responses || [];
        const filled = responses.some(resp => resp.respondentEmail === studentEmail);

        formsWithStatus.push({
          form_title: form.form_title,
          form_link: form.form_link,
          filled: filled ? 'Yes' : 'No',
        });
      } catch (error) {
        console.error(`Error fetching responses for form ${formId}:`, error);
        formsWithStatus.push({
          form_title: form.form_title,
          form_link: form.form_link,
          filled: 'Error',
        });
      }
    }

    // 5. Return the list of forms with their submission status.
    res.status(200).json({
      student_id: studentId,
      forms: formsWithStatus,
    });
  } catch (error) {
    console.error('Error fetching student forms:', error);
    res.status(500).json({ error: 'Server error while fetching student forms' });
  }
}

import pool from '../config/db.js';
import { getLinkedSpreadsheetId, fetchSpreadsheetResponses } from '../services/fetchGoogleFormData.js';

/**
 * Fetch all forms assigned to the student and determine, for each, whether the student has filled it.
 * For each form, the teacher’s access token (from the user record associated with the class) 
 * is used to search for the linked spreadsheet and fetch responses.
 *
 * Expected endpoint: GET /api/student/forms-not-filled
 */
export async function getStudentFormsNotFilled(req, res) {
  const { userId } = req.cookies; // Student's ID

  try {
    // 1. Get the student's email from the DB.
    const studentResult = await pool.query(
      `SELECT email FROM students WHERE student_id = $1`,
      [userId]
    );
    if (studentResult.rowCount === 0) {
      return res.status(404).json({ error: "Student not found" });
    }
    const studentEmail = studentResult.rows[0].email;

    // 2. Get all forms assigned to the student.
    //    Join google_forms with classes to also retrieve the teacher's id.
    const formsResult = await pool.query(
      `SELECT gf.form_id, gf.form_title, gf.form_link, gf.due_date, c.user_id AS teacher_id
       FROM google_forms gf
       JOIN classes c ON gf.class_id = c.class_id
       JOIN class_students cs ON gf.class_id = cs.class_id
       WHERE cs.student_id = $1`,
      [userId]
    );
    const forms = formsResult.rows;

    // 3. For each form, use the teacher's access token to find the linked spreadsheet
    //    and check if the student's email appears in the responses.
    const formsWithStatus = await Promise.all(forms.map(async (form) => {
      try {
        // Get the teacher's token from the users table based on teacher_id.
        const teacherTokensResult = await pool.query(
          `SELECT access_token FROM users WHERE user_id = $1`,
          [form.teacher_id]
        );
        if (!teacherTokensResult.rows[0]?.access_token) {
          return { ...form, completed: "Unknown", error: "Teacher access token not found" };
        }
        const teacherAccessToken = teacherTokensResult.rows[0].access_token;

        // Use the teacher's token to search for a linked spreadsheet by form title.
        const spreadsheetId = await getLinkedSpreadsheetId(teacherAccessToken, form.form_title);
        if (!spreadsheetId) {
          return { ...form, completed: "Unknown", error: "No linked spreadsheet found" };
        }

        // Fetch responses from the linked spreadsheet.
        const sheetData = await fetchSpreadsheetResponses(teacherAccessToken, spreadsheetId);
        const rows = sheetData.values || [];
        // Assume the first row is the header; check subsequent rows for the student's email.
        let completed = "No";
        for (let i = 1; i < rows.length; i++) {
          if (rows[i].some(cell => cell.toLowerCase() === studentEmail.toLowerCase())) {
            completed = "Yes";
            break;
          }
        }
        return { ...form, completed };
      } catch (err) {
        return { ...form, completed: "Unknown", error: err.message };
      }
    }));

    res.status(200).json({ forms: formsWithStatus });
  } catch (error) {
    console.error("Error fetching student forms:", error);
    res.status(500).json({ error: "Failed to fetch student forms" });
  }
}

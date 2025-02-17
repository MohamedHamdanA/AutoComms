import pool from '../config/db.js';

export async function storeSession(sessionID, studentID, csrfToken, expiresAt) {
  await pool.query(
    'INSERT INTO stusessions (session_id, student_id, csrf_token, expires_at) VALUES ($1, $2, $3, $4)',
    [sessionID, studentID, csrfToken, expiresAt]
  );
}

export async function deleteSession(sessionID) {
  await pool.query('DELETE FROM stusessions WHERE session_id = $1', [sessionID]);
}
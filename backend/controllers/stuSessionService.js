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

export async function getUserIDFromSession(sessionID) {
  const rows = await pool.query(
    'SELECT student_id FROM stusessions WHERE session_id = $1',
    [sessionID]
  );

  if (rows.length === 0) {
    throw new Error('Session not found or expired');
  }
  return rows.rows[0].student_id;
}
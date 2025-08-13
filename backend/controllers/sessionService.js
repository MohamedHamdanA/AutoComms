import pool from '../config/db.js';

export async function storeSession(sessionID, userID, csrfToken, expiresAt) {
  await pool.query(
    'INSERT INTO sessions (session_id, user_id, csrf_token, expires_at) VALUES ($1, $2, $3, $4)',
    [sessionID, userID, csrfToken, expiresAt]
  );
}

export async function deleteSession(sessionID) {
  await pool.query('DELETE FROM sessions WHERE session_id = $1', [sessionID]);
}

import pool from '../config/db.js';

export async function validateCsrf(req, res, next) {
  const csrfToken = req.cookies.csrfToken;
  const sessionID = req.cookies.sessionID;

  if (!csrfToken || !sessionID) {
    return res.status(401).json({ error: 'Invalid CSRF token or Session ID' });
  }

  try {
    const result = await pool.query('SELECT csrf_token FROM sessions WHERE session_id = $1', [sessionID]);

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid CSRF token' });
    }

    const storedCsrfToken = result.rows[0].csrf_token;

    if (csrfToken !== storedCsrfToken) {
      return res.status(403).json({ error: 'Invalid CSRF token' });
    }

    next();
  } catch (error) {
    console.error('CSRF token validation error:', error);
    res.status(500).json({ error: 'CSRF validation failed' });
  }
}

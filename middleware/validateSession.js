import pool from '../config/db.js';

export async function validateSession(req, res, next) {
  const sessionID = req.cookies.sessionID;

  if (!sessionID) {
    return res.status(401).json({ error: 'Session expired or invalid' });
  }

  try {
    const result = await pool.query('SELECT * FROM sessions WHERE session_id = $1', [sessionID]);

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Session expired or invalid' });
    }

    const session = result.rows[0];
    if (new Date() > new Date(session.expires_at)) {
    //   await pool.query('DELETE FROM sessions WHERE session_id = $1', [sessionID]);
      return res.status(401).json({ error: 'Session expired or invalid' });
    }

    req.userId = session.user_id;
    next();
  } catch (error) {
    console.error('Session validation error:', error);
    res.status(500).json({ error: 'Session validation failed' });
  }
}

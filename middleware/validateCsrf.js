export function validateCsrf(req, res, next) {
    const csrfToken = req.cookies.csrfToken;
  
    if (!csrfToken) {
      return res.status(401).json({ error: 'Invalid CSRF token' });
    }
  
    if (csrfToken !== req.cookies.csrfToken) {
      return res.status(401).json({ error: 'Invalid CSRF token' });
    }
  
    next();
  }
  
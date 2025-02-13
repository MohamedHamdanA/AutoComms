export function validateCsrf(req, res, next) {
  const csrfToken = req.cookies.csrfToken;
  const sessionCsrfToken = req.session?.csrfToken; // Assuming session stores the original CSRF token

  if (!csrfToken || csrfToken !== sessionCsrfToken) {
    return res.status(403).json({ error: 'Invalid CSRF token' });
  }
  next();
}

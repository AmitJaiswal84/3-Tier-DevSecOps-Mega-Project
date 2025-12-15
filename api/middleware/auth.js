const jwt = require('jsonwebtoken');

/**
 * 🔐 JWT Secret (MUST be set via env)
 */
if (!process.env.JWT_SECRET) {
  throw new Error('❌ JWT_SECRET is not set in environment variables');
}

const JWT_SECRET = process.env.JWT_SECRET;

/**
 * ✅ Middleware: Verify JWT Token
 */
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Expect: Authorization: Bearer <token>
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      message: 'Authorization token missing or malformed',
    });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    // Attach user info to request
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({
      message: 'Invalid or expired token',
    });
  }
};

/**
 * 🔒 Middleware: Allow Admin Only
 */
const isAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({
      message: 'Access denied: Admins only',
    });
  }
  next();
};

module.exports = {
  verifyToken,
  isAdmin,
};


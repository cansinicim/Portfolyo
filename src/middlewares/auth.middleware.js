const jwt = require('jsonwebtoken');
const User = require('../modules/auth/user.model');
const { sendError } = require('../core/response');

const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return sendError(res, 'Not authorized, no token', 401);
  }

  try {
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');
    if (!req.user) return sendError(res, 'User not found', 401);
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = { protect };

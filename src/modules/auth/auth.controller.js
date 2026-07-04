const jwt = require('jsonwebtoken');
const User = require('./user.model');
const { sendSuccess, sendError } = require('../../core/response');
const { loginSchema } = require('./auth.validation');

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE || '7d' });

const login = async (req, res, next) => {
  try {
    const { error, value } = loginSchema.validate(req.body);
    if (error) return sendError(res, error.details[0].message, 400);

    const user = await User.findOne({ email: value.email });
    if (!user || !(await user.comparePassword(value.password))) {
      return sendError(res, 'Invalid email or password', 401);
    }

    const token = signToken(user._id);
    return sendSuccess(res, { token, user: { id: user._id, email: user.email, role: user.role } }, 'Login successful');
  } catch (err) {
    next(err);
  }
};

const getMe = async (req, res) => {
  return sendSuccess(res, req.user, 'Current user fetched');
};

module.exports = { login, getMe };

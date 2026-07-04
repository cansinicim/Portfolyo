const router = require('express').Router();
const { login, getMe } = require('./auth.controller');
const { protect } = require('../../middlewares/auth.middleware');

router.post('/login', login);
router.get('/me', protect, getMe);

module.exports = router;

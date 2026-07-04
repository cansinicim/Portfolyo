const router = require('express').Router();
const { getDashboard } = require('./dashboard.controller');
const { protect } = require('../../middlewares/auth.middleware');

router.get('/', protect, getDashboard);

module.exports = router;

const router = require('express').Router();
const { getProfile, upsertProfile } = require('./profile.controller');
const { protect } = require('../../middlewares/auth.middleware');

router.get('/', getProfile);
router.put('/', protect, upsertProfile);

module.exports = router;

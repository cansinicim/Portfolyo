const router = require('express').Router();
const { getSocials, createSocial, updateSocial, deleteSocial } = require('./social.controller');
const { protect } = require('../../middlewares/auth.middleware');

router.get('/', getSocials);
router.post('/', protect, createSocial);
router.put('/:id', protect, updateSocial);
router.delete('/:id', protect, deleteSocial);

module.exports = router;

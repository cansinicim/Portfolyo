const router = require('express').Router();
const { getContact, upsertContact } = require('./contact.controller');
const { protect } = require('../../middlewares/auth.middleware');

router.get('/', getContact);
router.put('/', protect, upsertContact);

module.exports = router;

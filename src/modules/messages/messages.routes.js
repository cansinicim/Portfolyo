const router = require('express').Router();
const { createMessage, getMessages, markAsRead, deleteMessage } = require('./messages.controller');
const { protect } = require('../../middlewares/auth.middleware');

router.post('/', createMessage);
router.get('/', protect, getMessages);
router.put('/:id/read', protect, markAsRead);
router.delete('/:id', protect, deleteMessage);

module.exports = router;

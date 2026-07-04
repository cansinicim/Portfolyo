const router = require('express').Router();
const upload = require('./upload.middleware');
const { uploadFile } = require('./upload.controller');
const { protect } = require('../../middlewares/auth.middleware');

router.post('/', protect, upload.single('file'), uploadFile);

module.exports = router;

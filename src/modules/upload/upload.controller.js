const { sendSuccess, sendError } = require('../../core/response');

const uploadFile = (req, res) => {
  if (!req.file) return sendError(res, 'No file uploaded', 400);
  const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
  return sendSuccess(res, { url: fileUrl, filename: req.file.filename }, 'File uploaded successfully', 201);
};

module.exports = { uploadFile };

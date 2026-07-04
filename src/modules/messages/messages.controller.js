const Message = require('./messages.model');
const { sendSuccess, sendError } = require('../../core/response');
const { messageSchema } = require('./messages.validation');

const createMessage = async (req, res, next) => {
  try {
    const { error, value } = messageSchema.validate(req.body);
    if (error) return sendError(res, error.details[0].message, 400);
    const message = await Message.create(value);
    return sendSuccess(res, message, 'Message sent successfully', 201);
  } catch (err) {
    next(err);
  }
};

const getMessages = async (req, res, next) => {
  try {
    const filter = {};
    if (req.query.isRead === 'true') filter.isRead = true;
    if (req.query.isRead === 'false') filter.isRead = false;
    const messages = await Message.find(filter).sort({ createdAt: -1 });
    return sendSuccess(res, messages, 'Messages fetched');
  } catch (err) {
    next(err);
  }
};

const markAsRead = async (req, res, next) => {
  try {
    const message = await Message.findByIdAndUpdate(
      req.params.id,
      { isRead: true },
      { new: true }
    );
    if (!message) return sendError(res, 'Message not found', 404);
    return sendSuccess(res, message, 'Message marked as read');
  } catch (err) {
    next(err);
  }
};

const deleteMessage = async (req, res, next) => {
  try {
    const message = await Message.findByIdAndDelete(req.params.id);
    if (!message) return sendError(res, 'Message not found', 404);
    return sendSuccess(res, null, 'Message deleted');
  } catch (err) {
    next(err);
  }
};

module.exports = { createMessage, getMessages, markAsRead, deleteMessage };

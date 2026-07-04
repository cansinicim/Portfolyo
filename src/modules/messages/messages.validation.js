const Joi = require('joi');

const messageSchema = Joi.object({
  name: Joi.string().trim().required(),
  email: Joi.string().email().required(),
  subject: Joi.string().trim().required(),
  message: Joi.string().required(),
});

module.exports = { messageSchema };

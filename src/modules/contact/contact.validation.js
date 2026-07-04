const Joi = require('joi');

const contactSchema = Joi.object({
  email: Joi.string().email().allow('', null),
  phone: Joi.string().trim().allow('', null),
  address: Joi.string().trim().allow('', null),
  mapUrl: Joi.string().uri().allow('', null),
});

module.exports = { contactSchema };

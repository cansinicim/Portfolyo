const Joi = require('joi');

const profileSchema = Joi.object({
  fullName: Joi.string().trim().required(),
  title: Joi.string().trim().required(),
  about: Joi.string().required(),
  location: Joi.string().trim().allow('', null),
  cvUrl: Joi.string().uri().allow('', null),
  profileImage: Joi.string().allow('', null),
});

module.exports = { profileSchema };

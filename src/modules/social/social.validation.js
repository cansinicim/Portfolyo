const Joi = require('joi');

const socialSchema = Joi.object({
  platform: Joi.string().trim().required(),
  url: Joi.string().uri().required(),
  icon: Joi.string().trim().allow('', null),
  isActive: Joi.boolean(),
});

const socialUpdateSchema = socialSchema.fork(['platform', 'url'], (f) => f.optional());

module.exports = { socialSchema, socialUpdateSchema };

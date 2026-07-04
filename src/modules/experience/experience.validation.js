const Joi = require('joi');

const experienceSchema = Joi.object({
  company: Joi.string().trim().required(),
  position: Joi.string().trim().required(),
  startDate: Joi.date().required(),
  endDate: Joi.date().allow(null),
  description: Joi.string().trim().allow('', null),
});

const experienceUpdateSchema = experienceSchema.fork(
  ['company', 'position', 'startDate'],
  (f) => f.optional()
);

module.exports = { experienceSchema, experienceUpdateSchema };

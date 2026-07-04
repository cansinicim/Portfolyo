const Joi = require('joi');

const skillSchema = Joi.object({
  name: Joi.string().trim().required(),
  level: Joi.number().integer().min(1).max(100).required(),
  category: Joi.string().valid('frontend', 'backend', 'devops', 'other').required(),
});

const skillUpdateSchema = skillSchema.fork(['name', 'level', 'category'], (f) => f.optional());

module.exports = { skillSchema, skillUpdateSchema };

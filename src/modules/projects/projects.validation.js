const Joi = require('joi');

const projectSchema = Joi.object({
  title: Joi.string().trim().required(),
  description: Joi.string().required(),
  technologies: Joi.array().items(Joi.string().trim()),
  githubUrl: Joi.string().uri().allow('', null),
  liveUrl: Joi.string().uri().allow('', null),
  image: Joi.string().allow('', null),
  isFeatured: Joi.boolean(),
});

const projectUpdateSchema = projectSchema.fork(
  ['title', 'description'],
  (f) => f.optional()
);

module.exports = { projectSchema, projectUpdateSchema };

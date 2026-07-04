const Joi = require('joi');

const blogSchema = Joi.object({
  title: Joi.string().trim().required(),
  content: Joi.string().required(),
  excerpt: Joi.string().trim().allow('', null),
  coverImage: Joi.string().allow('', null),
  author: Joi.string().trim().allow('', null),
  tags: Joi.array().items(Joi.string().trim().lowercase()),
  status: Joi.string().valid('draft', 'published'),
  metaTitle: Joi.string().trim().allow('', null),
  metaDescription: Joi.string().trim().allow('', null),
});

const blogUpdateSchema = blogSchema.fork(['title', 'content'], (f) => f.optional());

module.exports = { blogSchema, blogUpdateSchema };

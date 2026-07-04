const Blog = require('./blogs.model');
const { sendSuccess, sendError } = require('../../core/response');
const { blogSchema, blogUpdateSchema } = require('./blogs.validation');
const { makeUniqueSlug } = require('../../utils/slug');
const { calculateReadingTime } = require('../../utils/readingTime');

const getBlogs = async (req, res, next) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(50, parseInt(req.query.limit) || 10);
    const skip = (page - 1) * limit;

    const filter = {};
    if (req.query.status) filter.status = req.query.status;
    if (req.query.tag) filter.tags = req.query.tag;
    if (req.query.search) {
      filter.$or = [
        { title: { $regex: req.query.search, $options: 'i' } },
        { content: { $regex: req.query.search, $options: 'i' } },
        { excerpt: { $regex: req.query.search, $options: 'i' } },
      ];
    }

    const sortField = req.query.sort || 'createdAt';
    const sortOrder = req.query.order === 'asc' ? 1 : -1;

    const [blogs, total] = await Promise.all([
      Blog.find(filter).sort({ [sortField]: sortOrder }).skip(skip).limit(limit),
      Blog.countDocuments(filter),
    ]);

    return sendSuccess(res, { blogs, total, page, totalPages: Math.ceil(total / limit) }, 'Blogs fetched');
  } catch (err) {
    next(err);
  }
};

const getBlogBySlug = async (req, res, next) => {
  try {
    const blog = await Blog.findOneAndUpdate(
      { slug: req.params.slug },
      { $inc: { viewCount: 1 } },
      { new: true }
    );
    if (!blog) return sendError(res, 'Blog not found', 404);

    const related = await Blog.find({
      _id: { $ne: blog._id },
      status: 'published',
      tags: { $in: blog.tags },
    })
      .limit(3)
      .select('title slug excerpt coverImage publishedAt readingTime');

    return sendSuccess(res, { blog, related }, 'Blog fetched');
  } catch (err) {
    next(err);
  }
};

const createBlog = async (req, res, next) => {
  try {
    const { error, value } = blogSchema.validate(req.body);
    if (error) return sendError(res, error.details[0].message, 400);
    value.slug = await makeUniqueSlug(Blog, value.title);
    value.readingTime = calculateReadingTime(value.content);
    if (value.status === 'published' && !value.publishedAt) value.publishedAt = new Date();
    const blog = await Blog.create(value);
    return sendSuccess(res, blog, 'Blog created', 201);
  } catch (err) {
    next(err);
  }
};

const updateBlog = async (req, res, next) => {
  try {
    const { error, value } = blogUpdateSchema.validate(req.body);
    if (error) return sendError(res, error.details[0].message, 400);
    if (value.title) value.slug = await makeUniqueSlug(Blog, value.title, req.params.id);
    if (value.content) value.readingTime = calculateReadingTime(value.content);
    if (value.status === 'published') {
      const existing = await Blog.findById(req.params.id);
      if (existing && existing.status !== 'published') value.publishedAt = new Date();
    }
    const blog = await Blog.findByIdAndUpdate(req.params.id, value, { new: true, runValidators: true });
    if (!blog) return sendError(res, 'Blog not found', 404);
    return sendSuccess(res, blog, 'Blog updated');
  } catch (err) {
    next(err);
  }
};

const deleteBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) return sendError(res, 'Blog not found', 404);
    return sendSuccess(res, null, 'Blog deleted');
  } catch (err) {
    next(err);
  }
};

module.exports = { getBlogs, getBlogBySlug, createBlog, updateBlog, deleteBlog };

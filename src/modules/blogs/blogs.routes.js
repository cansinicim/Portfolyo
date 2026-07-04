const router = require('express').Router();
const { getBlogs, getBlogBySlug, createBlog, updateBlog, deleteBlog } = require('./blogs.controller');
const { protect } = require('../../middlewares/auth.middleware');

router.get('/', getBlogs);
router.get('/:slug', getBlogBySlug);
router.post('/', protect, createBlog);
router.put('/:id', protect, updateBlog);
router.delete('/:id', protect, deleteBlog);

module.exports = router;

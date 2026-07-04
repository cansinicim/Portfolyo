const Project = require('../projects/projects.model');
const Blog = require('../blogs/blogs.model');
const Message = require('../messages/messages.model');
const Skill = require('../skills/skills.model');
const Experience = require('../experience/experience.model');
const { sendSuccess } = require('../../core/response');

const getDashboard = async (req, res, next) => {
  try {
    const [
      projects,
      blogs,
      publishedBlogs,
      messages,
      unreadMessages,
      skills,
      experience,
      viewsAgg,
    ] = await Promise.all([
      Project.countDocuments(),
      Blog.countDocuments(),
      Blog.countDocuments({ status: 'published' }),
      Message.countDocuments(),
      Message.countDocuments({ isRead: false }),
      Skill.countDocuments(),
      Experience.countDocuments(),
      Blog.aggregate([{ $group: { _id: null, total: { $sum: '$viewCount' } } }]),
    ]);

    return sendSuccess(
      res,
      {
        projects,
        blogs,
        publishedBlogs,
        draftBlogs: blogs - publishedBlogs,
        messages,
        unreadMessages,
        skills,
        experience,
        views: viewsAgg[0]?.total || 0,
      },
      'Dashboard data fetched'
    );
  } catch (err) {
    next(err);
  }
};

module.exports = { getDashboard };

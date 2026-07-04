const Project = require('./projects.model');
const { sendSuccess, sendError } = require('../../core/response');
const { projectSchema, projectUpdateSchema } = require('./projects.validation');
const { makeUniqueSlug } = require('../../utils/slug');

const getProjects = async (req, res, next) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(50, parseInt(req.query.limit) || 10);
    const skip = (page - 1) * limit;

    const filter = {};
    if (req.query.featured === 'true') filter.isFeatured = true;

    const [projects, total] = await Promise.all([
      Project.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
      Project.countDocuments(filter),
    ]);

    return sendSuccess(res, { projects, total, page, totalPages: Math.ceil(total / limit) }, 'Projects fetched');
  } catch (err) {
    next(err);
  }
};

const getProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return sendError(res, 'Project not found', 404);
    return sendSuccess(res, project, 'Project fetched');
  } catch (err) {
    next(err);
  }
};

const createProject = async (req, res, next) => {
  try {
    const { error, value } = projectSchema.validate(req.body);
    if (error) return sendError(res, error.details[0].message, 400);
    value.slug = await makeUniqueSlug(Project, value.title);
    const project = await Project.create(value);
    return sendSuccess(res, project, 'Project created', 201);
  } catch (err) {
    next(err);
  }
};

const updateProject = async (req, res, next) => {
  try {
    const { error, value } = projectUpdateSchema.validate(req.body);
    if (error) return sendError(res, error.details[0].message, 400);
    if (value.title) value.slug = await makeUniqueSlug(Project, value.title, req.params.id);
    const project = await Project.findByIdAndUpdate(req.params.id, value, { new: true, runValidators: true });
    if (!project) return sendError(res, 'Project not found', 404);
    return sendSuccess(res, project, 'Project updated');
  } catch (err) {
    next(err);
  }
};

const deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) return sendError(res, 'Project not found', 404);
    return sendSuccess(res, null, 'Project deleted');
  } catch (err) {
    next(err);
  }
};

module.exports = { getProjects, getProject, createProject, updateProject, deleteProject };

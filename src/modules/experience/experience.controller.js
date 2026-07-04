const Experience = require('./experience.model');
const { sendSuccess, sendError } = require('../../core/response');
const { experienceSchema, experienceUpdateSchema } = require('./experience.validation');

const getExperiences = async (req, res, next) => {
  try {
    const experiences = await Experience.find().sort({ startDate: -1 });
    return sendSuccess(res, experiences, 'Experiences fetched');
  } catch (err) {
    next(err);
  }
};

const createExperience = async (req, res, next) => {
  try {
    const { error, value } = experienceSchema.validate(req.body);
    if (error) return sendError(res, error.details[0].message, 400);
    const experience = await Experience.create(value);
    return sendSuccess(res, experience, 'Experience created', 201);
  } catch (err) {
    next(err);
  }
};

const updateExperience = async (req, res, next) => {
  try {
    const { error, value } = experienceUpdateSchema.validate(req.body);
    if (error) return sendError(res, error.details[0].message, 400);
    const experience = await Experience.findByIdAndUpdate(req.params.id, value, { new: true, runValidators: true });
    if (!experience) return sendError(res, 'Experience not found', 404);
    return sendSuccess(res, experience, 'Experience updated');
  } catch (err) {
    next(err);
  }
};

const deleteExperience = async (req, res, next) => {
  try {
    const experience = await Experience.findByIdAndDelete(req.params.id);
    if (!experience) return sendError(res, 'Experience not found', 404);
    return sendSuccess(res, null, 'Experience deleted');
  } catch (err) {
    next(err);
  }
};

module.exports = { getExperiences, createExperience, updateExperience, deleteExperience };

const Skill = require('./skills.model');
const { sendSuccess, sendError } = require('../../core/response');
const { skillSchema, skillUpdateSchema } = require('./skills.validation');

const getSkills = async (req, res, next) => {
  try {
    const filter = {};
    if (req.query.category) filter.category = req.query.category;
    const skills = await Skill.find(filter).sort('category name');
    return sendSuccess(res, skills, 'Skills fetched');
  } catch (err) {
    next(err);
  }
};

const createSkill = async (req, res, next) => {
  try {
    const { error, value } = skillSchema.validate(req.body);
    if (error) return sendError(res, error.details[0].message, 400);
    const skill = await Skill.create(value);
    return sendSuccess(res, skill, 'Skill created', 201);
  } catch (err) {
    next(err);
  }
};

const updateSkill = async (req, res, next) => {
  try {
    const { error, value } = skillUpdateSchema.validate(req.body);
    if (error) return sendError(res, error.details[0].message, 400);
    const skill = await Skill.findByIdAndUpdate(req.params.id, value, { new: true, runValidators: true });
    if (!skill) return sendError(res, 'Skill not found', 404);
    return sendSuccess(res, skill, 'Skill updated');
  } catch (err) {
    next(err);
  }
};

const deleteSkill = async (req, res, next) => {
  try {
    const skill = await Skill.findByIdAndDelete(req.params.id);
    if (!skill) return sendError(res, 'Skill not found', 404);
    return sendSuccess(res, null, 'Skill deleted');
  } catch (err) {
    next(err);
  }
};

module.exports = { getSkills, createSkill, updateSkill, deleteSkill };

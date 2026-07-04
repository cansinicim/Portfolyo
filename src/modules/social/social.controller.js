const Social = require('./social.model');
const { sendSuccess, sendError } = require('../../core/response');
const { socialSchema, socialUpdateSchema } = require('./social.validation');

const getSocials = async (req, res, next) => {
  try {
    const filter = {};
    if (req.query.active === 'true') filter.isActive = true;
    const socials = await Social.find(filter).sort('platform');
    return sendSuccess(res, socials, 'Socials fetched');
  } catch (err) {
    next(err);
  }
};

const createSocial = async (req, res, next) => {
  try {
    const { error, value } = socialSchema.validate(req.body);
    if (error) return sendError(res, error.details[0].message, 400);
    const social = await Social.create(value);
    return sendSuccess(res, social, 'Social created', 201);
  } catch (err) {
    next(err);
  }
};

const updateSocial = async (req, res, next) => {
  try {
    const { error, value } = socialUpdateSchema.validate(req.body);
    if (error) return sendError(res, error.details[0].message, 400);
    const social = await Social.findByIdAndUpdate(req.params.id, value, { new: true, runValidators: true });
    if (!social) return sendError(res, 'Social not found', 404);
    return sendSuccess(res, social, 'Social updated');
  } catch (err) {
    next(err);
  }
};

const deleteSocial = async (req, res, next) => {
  try {
    const social = await Social.findByIdAndDelete(req.params.id);
    if (!social) return sendError(res, 'Social not found', 404);
    return sendSuccess(res, null, 'Social deleted');
  } catch (err) {
    next(err);
  }
};

module.exports = { getSocials, createSocial, updateSocial, deleteSocial };

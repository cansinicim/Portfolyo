const Profile = require('./profile.model');
const { sendSuccess, sendError } = require('../../core/response');
const { profileSchema } = require('./profile.validation');

const getProfile = async (req, res, next) => {
  try {
    const profile = await Profile.findOne();
    return sendSuccess(res, profile, 'Profile fetched');
  } catch (err) {
    next(err);
  }
};

const upsertProfile = async (req, res, next) => {
  try {
    const { error, value } = profileSchema.validate(req.body);
    if (error) return sendError(res, error.details[0].message, 400);

    const existing = await Profile.findOne();
    let profile;
    if (existing) {
      profile = await Profile.findByIdAndUpdate(existing._id, value, { new: true, runValidators: true });
    } else {
      profile = await Profile.create(value);
    }

    return sendSuccess(res, profile, 'Profile updated');
  } catch (err) {
    next(err);
  }
};

module.exports = { getProfile, upsertProfile };

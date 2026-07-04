const Contact = require('./contact.model');
const { sendSuccess, sendError } = require('../../core/response');
const { contactSchema } = require('./contact.validation');

const getContact = async (req, res, next) => {
  try {
    const contact = await Contact.findOne();
    return sendSuccess(res, contact, 'Contact info fetched');
  } catch (err) {
    next(err);
  }
};

const upsertContact = async (req, res, next) => {
  try {
    const { error, value } = contactSchema.validate(req.body);
    if (error) return sendError(res, error.details[0].message, 400);

    const existing = await Contact.findOne();
    let contact;
    if (existing) {
      contact = await Contact.findByIdAndUpdate(existing._id, value, { new: true, runValidators: true });
    } else {
      contact = await Contact.create(value);
    }

    return sendSuccess(res, contact, 'Contact info updated');
  } catch (err) {
    next(err);
  }
};

module.exports = { getContact, upsertContact };

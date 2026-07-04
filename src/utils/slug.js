const slugify = require('slugify');

const generateSlug = (text) => {
  return slugify(text, { lower: true, strict: true, trim: true });
};

const makeUniqueSlug = async (Model, title, excludeId = null) => {
  let slug = generateSlug(title);
  let exists = await Model.findOne({ slug, ...(excludeId && { _id: { $ne: excludeId } }) });
  let counter = 1;
  while (exists) {
    slug = `${generateSlug(title)}-${counter}`;
    exists = await Model.findOne({ slug, ...(excludeId && { _id: { $ne: excludeId } }) });
    counter++;
  }
  return slug;
};

module.exports = { generateSlug, makeUniqueSlug };

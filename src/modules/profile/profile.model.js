const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    title: { type: String, required: true, trim: true },
    about: { type: String, required: true },
    location: { type: String, trim: true },
    cvUrl: { type: String, trim: true },
    profileImage: { type: String, trim: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Profile', profileSchema);

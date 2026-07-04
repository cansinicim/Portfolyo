const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    level: { type: Number, required: true, min: 1, max: 100 },
    category: { type: String, enum: ['frontend', 'backend', 'devops', 'other'], required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Skill', skillSchema);

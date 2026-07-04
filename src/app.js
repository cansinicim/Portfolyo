const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const errorHandler = require('./middlewares/error.middleware');
const path = require('path');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  '/api',
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: process.env.NODE_ENV === 'production' ? 100 : 2000,
    message: { success: false, message: 'Too many requests, please try again later.' },
  })
);

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.get('/api/health', (req, res) => {
  res.status(200).json({ success: true, message: 'OK' });
});

app.use('/api/auth', require('./modules/auth/auth.routes'));
app.use('/api/profile', require('./modules/profile/profile.routes'));
app.use('/api/skills', require('./modules/skills/skills.routes'));
app.use('/api/projects', require('./modules/projects/projects.routes'));
app.use('/api/experience', require('./modules/experience/experience.routes'));
app.use('/api/blogs', require('./modules/blogs/blogs.routes'));
app.use('/api/socials', require('./modules/social/social.routes'));
app.use('/api/contact', require('./modules/contact/contact.routes'));
app.use('/api/messages', require('./modules/messages/messages.routes'));
app.use('/api/upload', require('./modules/upload/upload.routes'));
app.use('/api/dashboard', require('./modules/dashboard/dashboard.routes'));

app.use(errorHandler);

module.exports = app;

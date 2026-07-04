const router = require('express').Router();
const { getProjects, getProject, createProject, updateProject, deleteProject } = require('./projects.controller');
const { protect } = require('../../middlewares/auth.middleware');

router.get('/', getProjects);
router.get('/:id', getProject);
router.post('/', protect, createProject);
router.put('/:id', protect, updateProject);
router.delete('/:id', protect, deleteProject);

module.exports = router;

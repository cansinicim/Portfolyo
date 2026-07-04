const router = require('express').Router();
const { getSkills, createSkill, updateSkill, deleteSkill } = require('./skills.controller');
const { protect } = require('../../middlewares/auth.middleware');

router.get('/', getSkills);
router.post('/', protect, createSkill);
router.put('/:id', protect, updateSkill);
router.delete('/:id', protect, deleteSkill);

module.exports = router;

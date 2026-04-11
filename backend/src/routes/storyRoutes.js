const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');
const { getOne, updateOne } = require('../controllers/storyController');
const { validate } = require('../middlewares/validate');
const { storySchema } = require('../validators/schemas');

router.get('/', getOne);
router.put('/', protect, validate(storySchema), updateOne);

module.exports = router;

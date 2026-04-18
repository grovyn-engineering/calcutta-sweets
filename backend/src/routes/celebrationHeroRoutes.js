const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');
const { validate } = require('../middlewares/validate');
const { celebrationHeroUpdateSchema } = require('../validators/schemas');
const { getOne, updateOne } = require('../controllers/celebrationHeroController');

router.get('/', getOne);
router.put('/', protect, validate(celebrationHeroUpdateSchema), updateOne);

module.exports = router;

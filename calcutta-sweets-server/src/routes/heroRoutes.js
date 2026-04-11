const express = require('express');
const router = express.Router();
const { getHero, updateHero } = require('../controllers/heroController');
const { protect } = require('../middlewares/authMiddleware');
const { validate } = require('../middlewares/validate');
const { heroUpdateSchema } = require('../validators/schemas');

router.get('/', getHero);

router.put('/', protect, validate(heroUpdateSchema), updateHero);

module.exports = router;
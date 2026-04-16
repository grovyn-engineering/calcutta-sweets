const express = require('express');
const router = express.Router();
const { getMany, createOne, updateOne, deleteOne } = require('../controllers/heroController');
const { protect } = require('../middlewares/authMiddleware');
const { validate } = require('../middlewares/validate');
const { heroSchema, heroUpdateSchema } = require('../validators/schemas');

router.get('/', getMany);
router.post('/', protect, validate(heroSchema), createOne);
router.put('/:id', protect, validate(heroUpdateSchema), updateOne);
router.delete('/:id', protect, deleteOne);

module.exports = router;
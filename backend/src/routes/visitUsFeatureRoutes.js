const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');
const { validate } = require('../middlewares/validate');
const {
  visitUsFeatureCreateSchema,
  visitUsFeatureUpdateSchema,
} = require('../validators/schemas');
const { getMany, createOne, updateOne, deleteOne } = require('../controllers/visitUsFeatureController');

router.get('/', getMany);
router.post('/', protect, validate(visitUsFeatureCreateSchema), createOne);
router.put('/:id', protect, validate(visitUsFeatureUpdateSchema), updateOne);
router.delete('/:id', protect, deleteOne);

module.exports = router;

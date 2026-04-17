const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');
const { validate } = require('../middlewares/validate');
const {
  testimonialCreateSchema,
  testimonialUpdateSchema,
} = require('../validators/schemas');
const { getMany, createOne, updateOne, deleteOne } = require('../controllers/testimonialController');

router.get('/', getMany);
router.post('/', protect, validate(testimonialCreateSchema), createOne);
router.put('/:id', protect, validate(testimonialUpdateSchema), updateOne);
router.delete('/:id', protect, deleteOne);

module.exports = router;

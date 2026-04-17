const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');
const { validate } = require('../middlewares/validate');
const {
  visitUsStatCreateSchema,
  visitUsStatUpdateSchema,
} = require('../validators/schemas');
const { getMany, createOne, updateOne, deleteOne } = require('../controllers/visitUsStatController');

router.get('/', getMany);
router.post('/', protect, validate(visitUsStatCreateSchema), createOne);
router.put('/:id', protect, validate(visitUsStatUpdateSchema), updateOne);
router.delete('/:id', protect, deleteOne);

module.exports = router;

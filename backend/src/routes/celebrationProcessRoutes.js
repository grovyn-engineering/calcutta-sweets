const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');
const { validate } = require('../middlewares/validate');
const {
  celebrationProcessCreateSchema,
  celebrationProcessUpdateSchema,
} = require('../validators/schemas');
const { getMany, createOne, updateOne, deleteOne } = require('../controllers/celebrationProcessController');

router.get('/', getMany);
router.post('/', protect, validate(celebrationProcessCreateSchema), createOne);
router.put('/:id', protect, validate(celebrationProcessUpdateSchema), updateOne);
router.delete('/:id', protect, deleteOne);

module.exports = router;

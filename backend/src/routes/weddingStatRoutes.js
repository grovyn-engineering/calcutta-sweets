const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');
const { getMany, createOne, updateOne, deleteOne } = require('../controllers/weddingStatController');
const { validate } = require('../middlewares/validate');
const { weddingStatSchema, weddingStatUpdateSchema } = require('../validators/schemas');

router.get('/', getMany);
router.post('/', protect, validate(weddingStatSchema), createOne);
router.put('/:id', protect, validate(weddingStatUpdateSchema), updateOne);
router.delete('/:id', protect, deleteOne);

module.exports = router;

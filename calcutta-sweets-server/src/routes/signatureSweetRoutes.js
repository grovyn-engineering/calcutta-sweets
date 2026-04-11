const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');
const { getMany, createOne, updateOne, deleteOne } = require('../controllers/signatureSweetController');
const { validate } = require('../middlewares/validate');
const { signatureSweetCreateSchema, signatureSweetUpdateSchema } = require('../validators/schemas');

router.get('/', getMany);
router.post('/', protect, validate(signatureSweetCreateSchema), createOne);
router.put('/:id', protect, validate(signatureSweetUpdateSchema), updateOne);
router.delete('/:id', protect, deleteOne);

module.exports = router;

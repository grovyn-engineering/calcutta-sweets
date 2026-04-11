const express = require('express');
const router = express.Router();
const { getOccasions, createOccasion, updateOccasion, deleteOccasion } = require('../controllers/occasionController');
const { protect } = require('../middlewares/authMiddleware');
const { validate } = require('../middlewares/validate');
const { occasionCreateSchema, occasionUpdateSchema } = require('../validators/schemas');

router.get('/', getOccasions);
router.post('/', protect, validate(occasionCreateSchema), createOccasion);
router.put('/:id', protect, validate(occasionUpdateSchema), updateOccasion);
router.delete('/:id', protect, deleteOccasion);

module.exports = router;

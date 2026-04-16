const express = require('express');
const { getMany, createOne, updateOne, deleteOne } = require('../controllers/timelineEventController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', getMany);
router.post('/', protect, createOne);
router.put('/:id', protect, updateOne);
router.delete('/:id', protect, deleteOne);

module.exports = router;

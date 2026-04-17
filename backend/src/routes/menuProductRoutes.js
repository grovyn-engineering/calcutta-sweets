const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');
const { validate } = require('../middlewares/validate');
const {
  menuProductCreateSchema,
  menuProductUpdateSchema,
} = require('../validators/schemas');
const {
  getPublicMany,
  getManageMany,
  getPublicOne,
  createOne,
  updateOne,
  deleteOne,
} = require('../controllers/menuProductController');

router.get('/manage', protect, getManageMany);
router.post('/', protect, validate(menuProductCreateSchema), createOne);
router.get('/', getPublicMany);
router.get('/:id', getPublicOne);
router.put('/:id', protect, validate(menuProductUpdateSchema), updateOne);
router.delete('/:id', protect, deleteOne);

module.exports = router;

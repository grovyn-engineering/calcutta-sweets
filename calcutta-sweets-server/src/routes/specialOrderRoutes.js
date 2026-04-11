const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');
const { getOne, updateOne } = require('../controllers/specialOrderController');
const { validate } = require('../middlewares/validate');
const { specialOrderSchema } = require('../validators/schemas');

router.get('/', getOne);
router.put('/', protect, validate(specialOrderSchema), updateOne);

module.exports = router;

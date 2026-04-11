const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');
const { getOne, updateOne } = require('../controllers/contactInfoController');
const { validate } = require('../middlewares/validate');
const { contactInfoSchema } = require('../validators/schemas');

router.get('/', getOne);
router.put('/', protect, validate(contactInfoSchema), updateOne);

module.exports = router;

const express = require('express');
const { generateSignature } = require('../controllers/uploadController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/sign', protect, generateSignature);

module.exports = router;

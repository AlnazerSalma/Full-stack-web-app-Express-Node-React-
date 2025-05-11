// src/routes/careersRouter.js
const express = require('express');
const router = express.Router();
const { getCareers } = require('../controllers/careerController');

router.get('/', getCareers);

module.exports = router;

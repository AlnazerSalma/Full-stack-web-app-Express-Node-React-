const express = require('express');
const router = express.Router();
const { getWorks } = require('../controllers/workController');

router.get('/', getWorks);

module.exports = router;

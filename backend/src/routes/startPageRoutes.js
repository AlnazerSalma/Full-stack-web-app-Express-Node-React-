const express = require('express');
const router = express.Router();
const { getSliders } = require('../controllers/startPageController');

router.get('/', getSliders);

module.exports = router;

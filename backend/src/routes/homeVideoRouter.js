const express = require('express');
const router = express.Router();
const { getHomeVideos } = require('../controllers/homeVideoController');

router.get('/', getHomeVideos);

module.exports = router;

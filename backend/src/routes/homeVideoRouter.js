const express = require("express");
const router = express.Router();
const {
  getHomeVideos,
  getHomeVideoById,
  getHomeVideoByName,
  searchHomeVideos,
} = require("../controllers/homeVideoController");

router.get("/", getHomeVideos);
router.get('/search', searchHomeVideos);
router.get('/:id', getHomeVideoById);
router.get('/name/:name', getHomeVideoByName);
module.exports = router;

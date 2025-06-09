const express = require("express");
const router = express.Router();
const {
  getSliders,
  getSliderById,
  getSliderByName,
  searchSliders,
} = require("../controllers/startPageController");

router.get("/", getSliders);
router.get('/search', searchSliders);
router.get('/id/:id', getSliderById);
router.get('/name/:name', getSliderByName);

module.exports = router;

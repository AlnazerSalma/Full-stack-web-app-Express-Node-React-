const express = require("express");
const router = express.Router();
const {
    getWorks,
    getWorkById,
    getWorkByTitle,
    getWorkByType,
    getWorkByYear,
    searchWorks,
} = require("../controllers/workController");

router.get("/", getWorks);
router.get('/search', searchWorks);
router.get('/id/:id', getWorkById);
router.get('/title/:title', getWorkByTitle);
router.get('/type/:type', getWorkByType);
router.get('/year/:year', getWorkByYear);

module.exports = router;

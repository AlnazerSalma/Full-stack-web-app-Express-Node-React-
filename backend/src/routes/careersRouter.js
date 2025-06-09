const express = require("express");
const router = express.Router();
const {
  getCareers,
  getCareerById,
  getFilteredCareers,
  getCareersByType,
  getCareersByLocation,
  searchCareers
} = require("../controllers/careerController");

router.get("/", getCareers);
router.get("/filter/search", getFilteredCareers);
router.get('/search', searchCareers); 
router.get("/:id", getCareerById);
router.get('/type/:type', getCareersByType);
router.get('/location/:location', getCareersByLocation);


module.exports = router;

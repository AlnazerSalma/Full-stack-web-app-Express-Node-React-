const express = require("express");
const router = express.Router();
const {
  getPricing,
  getPricingById,
  getPricingByTitle,
  getPricingByPrice,
  getPricingByCurrencySymbol,
  getPricingByBillingCycle,
  searchPricing,
} = require("../controllers/pricingController");

router.get("/", getPricing);
router.get('/search', searchPricing); 
router.get('/id/:id', getPricingById);
router.get('/title/:title', getPricingByTitle);
router.get('/price/:price', getPricingByPrice);
router.get('/currency/:symbol', getPricingByCurrencySymbol);
router.get('/billing/:billingCycle', getPricingByBillingCycle);

module.exports = router;

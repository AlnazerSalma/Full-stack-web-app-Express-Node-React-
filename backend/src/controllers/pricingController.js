const pricingItems = require('../data/pricingItems');

const getPricing = (req, res) => {
  res.json(pricingItems);
};

module.exports = {
  getPricing,
};

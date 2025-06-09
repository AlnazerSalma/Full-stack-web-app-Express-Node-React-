const pricingItems = require('../data/pricingItems');

/**Case-insensitive */
const includesIgnoreCase = (source = '', target = '') =>
  source.toLowerCase().includes(target.toLowerCase());

/**Normalize price string to number (e.g., "£7,500" → 7500) */
const normalizePrice = (priceStr = '') =>
  Number(priceStr.replace(/[^\d.]/g, ''));

/**Extract currency symbol (e.g., "£10,000" → "£") */
const getCurrencySymbol = (priceStr = '') => {
  const match = priceStr.trim().match(/^[^\d\s]+/);
  return match ? match[0] : null;
};

/**
 * GET: All pricing plans
 * Route: GET /pricing
 */
const getPricing = (req, res) => {
  res.json(pricingItems);
};

/**
 * GET: Pricing plan by id
 * Route: GET /pricing/id/:id
 */
const getPricingById = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const item = pricingItems.find(p => p.id === id);
  if (!item) {
    return res.status(404).json({ error: "Pricing plan not found" });
  }
  res.json(item);
};

/**
 * GET: Pricing plan by exact title match
 * Route: GET /pricing/title/:title
 */
const getPricingByTitle = (req, res) => {
  const title = req.params.title;
  const item = pricingItems.find(p => p.title === title);
  if (!item) {
    return res.status(404).json({ error: "Title not found" });
  }
  res.json(item);
};

/**
 * GET: Pricing plans by exact numeric price
 * Accepts: 10000 or £10,000
 * Route: GET /pricing/price/:price
 */
const getPricingByPrice = (req, res) => {
  const requestPrice = normalizePrice(req.params.price);
  const results = pricingItems.filter(p => normalizePrice(p.price) === requestPrice);
  if (results.length === 0) {
    return res.status(404).json({ error: "No plans with that price found" });
  }
  res.json(results);
};

/**
 * GET: Pricing plans by currency symbol (e.g., £, $, €)
 * Route: GET /pricing/currency/:symbol
 */
const getPricingByCurrencySymbol = (req, res) => {
  const symbol = req.params.symbol;
  const results = pricingItems.filter(p => getCurrencySymbol(p.price) === symbol);
  if (results.length === 0) {
    return res.status(404).json({ error: `No plans found with currency symbol '${symbol}'` });
  }
  res.json(results);
};

/**
 * GET: Pricing plans by billing cycle (e.g., monthly, yearly)
 * Route: GET /pricing/billing-cycle/:billingCycle
 */
const getPricingByBillingCycle = (req, res) => {
  const billingCycle = req.params.billingCycle;
  const results = pricingItems.filter(p => p.billingCycle === billingCycle);
  if (results.length === 0) {
    return res.status(404).json({ error: "No plans with that billing cycle found" });
  }
  res.json(results);
};

/**
 * GET: Filtered pricing plans by query
 * Route: GET /pricing/search?title=..&price=..&billingCycle=..
 */
const searchPricing = (req, res) => {
  const { title, price, billingCycle } = req.query;
  let filtered = pricingItems;
  if (title) {
    filtered = filtered.filter(p => includesIgnoreCase(p.title, title));
  }
  if (price) {
    const numericPrice = normalizePrice(price);
    filtered = filtered.filter(p => normalizePrice(p.price) === numericPrice);
  }
  if (billingCycle) {
    filtered = filtered.filter(p => p.billingCycle === billingCycle);
  }
  res.json(filtered);
};

module.exports = {
  getPricing,
  getPricingById,
  getPricingByTitle,
  getPricingByPrice,
  getPricingByCurrencySymbol,
  getPricingByBillingCycle,
  searchPricing,
};

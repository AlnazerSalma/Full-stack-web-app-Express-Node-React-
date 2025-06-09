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

module.exports = {
  includesIgnoreCase,
  normalizePrice,
  getCurrencySymbol,
};

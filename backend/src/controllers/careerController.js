const careerItems = require('../data/careerItems');

// Utility: Case-insensitive partial match
const includesIgnoreCase = (source = '', target = '') =>
  source.toLowerCase().includes(target.toLowerCase());

/** 
 * GET: All careers 
 * Route: GET /careers
 */
const getCareers = (req, res) => {
  res.json(careerItems);
};

/** 
 * GET: Career by ID 
 * Route: GET /careers/:id
 * 10 refer to decimal→ the normal number system we use daily (0–9)
 */
const getCareerById = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const career = careerItems.find(item => item.id === id);

  if (!career) {
    return res.status(404).json({ error: "Career not found" });
  }

  const { title, location, mode, type } = career;
  res.json({ id: career.id, title, location, mode, type });
};

/** 
 * GET: Filtered careers by query 
 * Route: GET /careers/filter/search?title=..&location=..&type=..&mode=..
 */
const getFilteredCareers = (req, res) => {
  const { title, location, type, mode } = req.query;

  const filtered = careerItems.filter(item => (
    (!title || includesIgnoreCase(item.title, title)) &&
    (!location || includesIgnoreCase(item.location, location)) &&
    (!type || includesIgnoreCase(item.type, type)) &&
    (!mode || includesIgnoreCase(item.mode, mode))
  ));

  res.json(filtered);
};

/** 
 * GET: Careers by type 
 * Route: GET /careers/type/:type
 */
const getCareersByType = (req, res) => {
  const { type } = req.params;

  const careers = careerItems.filter(item =>
    includesIgnoreCase(item.type, type)
  );

  if (careers.length === 0) {
    return res.status(404).json({ error: 'No careers found for this type' });
  }

  res.json(careers);
};

/** 
 * GET: Careers by location 
 * Route: GET /careers/location/:location
 */
const getCareersByLocation = (req, res) => {
  const { location } = req.params;

  const careers = careerItems.filter(item =>
    includesIgnoreCase(item.location, location)
  );

  if (careers.length === 0) {
    return res.status(404).json({ error: 'No careers found for this location' });
  }

  res.json(careers);
};

/** 
 * GET: Search careers by keyword 
 * Route: GET /careers/search?q=keyword
 */
const searchCareers = (req, res) => {
  const { q } = req.query;

  if (!q) {
    return res.status(400).json({ error: "Missing search query" });
  }

  const results = careerItems.filter(item =>
    includesIgnoreCase(item.title, q) ||
    includesIgnoreCase(item.location, q) ||
    includesIgnoreCase(item.type, q) ||
    includesIgnoreCase(item.mode, q)
  );

  res.json(results);
};

// Export all controllers
module.exports = {
  getCareers,
  getCareerById,
  getFilteredCareers,
  getCareersByType,
  getCareersByLocation,
  searchCareers
};

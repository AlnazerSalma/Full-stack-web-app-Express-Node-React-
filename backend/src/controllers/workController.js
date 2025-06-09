const workItems = require('../data/workItems');
const { includesIgnoreCase } = require('../utils/helpers');
const { sendNotFound } = require('../utils/responses');

/**
 * GET: All works
 * Route: GET /works
 */
const getWorks = (req, res) => {
  res.json(workItems);
};

/**
 * GET: Work by ID
 * Route: GET /works/id/:id
 */
const getWorkById = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const work = workItems.find(item => item.id === id);
  if (!work)  return sendNotFound(res, "Work not found");
  res.json(work);
};

/**
 * GET: Work by title (exact or partial, case-insensitive)
 * Route: GET /works/title/:title
 */
const getWorkByTitle = (req, res) => {
  const title = req.params.title;
  const work = workItems.find(item => includesIgnoreCase(item.title, title));
  if (!work)  return sendNotFound(res, "Work with given title not found");
  res.json(work);
};

/**
 * GET: Work by type
 * Route: GET /works/type/:type
 */
const getWorkByType = (req, res) => {
  const type = req.params.type;
  const filtered = workItems.filter(item => includesIgnoreCase(item.type, type));
  if (!filtered.length)  return sendNotFound(res, "No works found with given type");
  res.json(filtered);
};

/**
 * GET: Work by year
 * Route: GET /works/year/:year
 */
const getWorkByYear = (req, res) => {
  const year = req.params.year;
  const filtered = workItems.filter(item => item.year === year);
  if (!filtered.length)  return sendNotFound(res, "No works found from that year");
  res.json(filtered);
};

/**
 * GET: Search works using any of title, type, or year (query params)
 * Route: GET /works/search?title=...&type=...&year=...
 */
const searchWorks = (req, res) => {
  const { title, type, year } = req.query;
  const filtered = workItems.filter(item => {
    const matchTitle = title ? includesIgnoreCase(item.title, title) : true;
    const matchType = type ? includesIgnoreCase(item.type, type) : true;
    const matchYear = year ? item.year === year : true;
    return matchTitle && matchType && matchYear;
  });
  if (!filtered.length)  return sendNotFound(res, "No matching works found");
  res.json(filtered);
};

module.exports = {
  getWorks,
  getWorkById,
  getWorkByTitle,
  getWorkByType,
  getWorkByYear,
  searchWorks
};

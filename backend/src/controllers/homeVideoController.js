const homeVideoItems = require('../data/homeVideoItems');

/** Case-insensitive text match */
const includesIgnoreCase = (source = '', target = '') =>
  source.toLowerCase().includes(target.toLowerCase());

/**
 * GET: All home videos
 * Route: GET /homevideos
 */
const getHomeVideos = (req, res) => {
  res.json(homeVideoItems);
};
/**
 * GET: Home video by ID
 * Route: GET /homevideos/id/:id
 */
const getHomeVideoById = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const video = homeVideoItems.find(item => item.id === id);

  if (!video) {
    return res.status(404).json({ error: "Video not found" });
  }

  res.json(video);
};
/**
 * GET: Home video by exact name (case-insensitive)
 * Route: GET /homevideos/name/:name
 */
const getHomeVideoByName = (req, res) => {
  const name = req.params.name;
  const video = homeVideoItems.find(item => includesIgnoreCase(item.name, name));

  if (!video) {
    return res.status(404).json({ error: "Video with given name not found" });
  }

  res.json(video);
};
/**
 * GET: Filtered home videos by name query
 * Route: GET /homevideos/search?name=...
 */
const searchHomeVideos = (req, res) => {
  const { name } = req.query;
  if (!name) {
    return res.status(400).json({ error: "Missing search parameter: name" });
  }

  const results = homeVideoItems.filter(item =>
    includesIgnoreCase(item.name, name)
  );

  res.json(results);
};
module.exports = {
  getHomeVideos,
  getHomeVideoById,
  getHomeVideoByName,
  searchHomeVideos
};

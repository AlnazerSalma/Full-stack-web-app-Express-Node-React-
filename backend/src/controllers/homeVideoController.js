const homeVideoItems = require('../data/homeVideoItems');
const { includesIgnoreCase } = require('../utils/helpers');
const { sendNotFound, sendBadRequest } = require('../utils/responses');

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
  if (!video) return sendNotFound(res, 'Video not found');
  res.json(video);
};

/**
 * GET: Home video by exact name (case-insensitive)
 * Route: GET /homevideos/name/:name
 */
const getHomeVideoByName = (req, res) => {
  const name = req.params.name;
  const video = homeVideoItems.find(item => includesIgnoreCase(item.name, name));
  if (!video) return sendNotFound(res, 'Video with given name not found');
  res.json(video);
};

/**
 * GET: Filtered home videos by name query
 * Route: GET /homevideos/search?name=...
 */
const searchHomeVideos = (req, res) => {
  const { name } = req.query;
  if (!name) return sendBadRequest(res, "Missing search parameter: name");
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

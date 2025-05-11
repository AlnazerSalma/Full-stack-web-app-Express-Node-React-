const homeVideoItems = require('../data/homeVideoItems');

const getHomeVideos = (req, res) => {
  res.json(homeVideoItems);
};

module.exports = {
  getHomeVideos,
};

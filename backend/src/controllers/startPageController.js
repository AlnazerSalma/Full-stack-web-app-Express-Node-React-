const sliderItems = require('../data/startPageItems');

const getSliders = (req, res) => {
  res.json(sliderItems);
};

module.exports = {
  getSliders,
};

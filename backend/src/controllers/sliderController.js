const sliderItems = require('../data/sliderItems');

const getSliders = (req, res) => {
  res.json(sliderItems);
};

module.exports = {
  getSliders,
};

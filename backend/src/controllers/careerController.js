const careerItems = require('../data/careerItems');
const getCareers = (req, res) => {
  res.json(careerItems);
};

module.exports = {
  getCareers,
};

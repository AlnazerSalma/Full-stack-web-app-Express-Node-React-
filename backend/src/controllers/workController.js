const workItems = require('../data/workItems');
const getWorks = (req, res) => {
  res.json(workItems);
};

module.exports = {
  getWorks,
};

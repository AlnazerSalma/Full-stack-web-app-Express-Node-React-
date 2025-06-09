const sliderItems = require('../data/startPageItems');

/**Case-insensitive string match */
const includesIgnoreCase = (source = '', target = '') =>
  source.toLowerCase().includes(target.toLowerCase());

/**
 * GET: All sliders
 * Route: GET /startPage
 */
const getSliders = (req, res) => {
  res.json(sliderItems);
};

/**
 * GET: Slider by ID
 * Route: GET /startPage/id/:id
 */
const getSliderById = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const item = sliderItems.find(slider => slider.id === id);

  if (!item) {
    return res.status(404).json({ error: 'Slider not found' });
  }

  res.json(item);
};

/**
 * GET: Slider by name (case-insensitive)
 * Route: GET /startPage/name/:name
 */
const getSliderByName = (req, res) => {
  const name = req.params.name;
  const item = sliderItems.find(slider =>
    includesIgnoreCase(slider.name, name)
  );

  if (!item) {
    return res.status(404).json({ error: 'Slider with given name not found' });
  }

  res.json(item);
};

/**
 * GET: Filtered sliders by search query
 * Route: GET /startPage/search?name=..&desc=..
 */
const searchSliders = (req, res) => {
  const { name, desc } = req.query;
  let results = sliderItems;

  if (name) {
    results = results.filter(slider => includesIgnoreCase(slider.name, name));
  }

  if (desc) {
    results = results.filter(slider =>
      includesIgnoreCase(slider.desc, desc)
    );
  }

  res.json(results);
};

module.exports = {
  getSliders,
  getSliderById,
  getSliderByName,
  searchSliders
};

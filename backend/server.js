const express = require('express');
const cors = require('cors');
const sliderRoutes = require('./src/routes/sliderRoutes');
const careerRoutes = require('./src/routes/careersRouter');
const pricingRoutes = require('./src/routes/pricingRouter'); 
const workRoutes = require('./src/routes/workRouter');
const homeVideoRoute = require('./src/routes/homeVideoRouter');


const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/sliders', sliderRoutes);
app.use('/api/careers', careerRoutes);
app.use('/api/pricing', pricingRoutes);
app.use('/api/works', workRoutes);
app.use('/api/homeVideos', homeVideoRoute);

// Root
app.get('/', (req, res) => {
  res.send('API is running. Available routes: /api/sliders, /api/careers, /api/pricing, /api/works, /api/homeVideos');
});

app.get('/api', (req, res) => {
  res.send('Welcome to the Haptic app API!');
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

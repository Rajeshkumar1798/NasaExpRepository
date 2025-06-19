require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors());

app.get('/', (req, res) => {
  res.send('🚀 NASA Explorer Backend is live! Try /api/apod or /api/mars');
});

// ✅ APOD endpoint
app.get('/api/apod', async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_API_KEY}`
    );
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching APOD data' });
  }
});

// ✅ Mars Rover endpoint
app.get('/api/mars', async (req, res) => {
  try {
    const date = req.query.date || '2024-01-01';
    const rover = req.query.rover || 'curiosity';
    const response = await axios.get(
      `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos`,
      { params: { earth_date: date, api_key: process.env.NASA_API_KEY } }
    );
    res.json({ photos: response.data.photos });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching Mars photos' });
  }
});

app.get('/api/epic', async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.nasa.gov/EPIC/api/natural?api_key=${process.env.NASA_API_KEY}`
    );
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching EPIC data' });
  }
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));

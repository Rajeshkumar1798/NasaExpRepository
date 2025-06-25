require('dotenv').config();
const express = require('express');
const OpenAI = require('openai');
const cors = require('cors');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
const PORT = process.env.PORT || 10000;

const allowedOrigins = [
  'http://localhost:3000',
  'https://nasa-frontend-ntvm.onrender.com'
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(express.json());

const users = []; // In-memory storage

// 🔐 Middleware to verify token
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Missing token' });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.user = user;
    next();
  });
}

// ✅ Health check route
app.get('/', (req, res) => {
  res.send('🚀 NASA Explorer Backend is live!');
});

// 📝 Signup
app.post('/api/signup', async (req, res) => {
  const { username, password } = req.body;
  if (users.find(u => u.username === username)) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ username, password: hashedPassword });
  res.status(201).json({ message: 'User registered successfully' });
});

// 🔐 Login
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);
  if (!user) return res.status(400).json({ message: 'User not found' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

  const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
});

// 🛰️ APOD (Public)
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

// 🪐 Mars (Public)
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

// 🌍 EPIC (Protected)
app.get('/api/epic', authenticateToken, async (req, res) => {
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




// ✅ OPENAI SETUP using version 5.7.0
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.post('/api/ask', async (req, res) => {
  const { question } = req.body;

  if (!question || question.trim() === '') {
    return res.status(400).json({ message: 'Question is required' });
  }

  try {
    const chatResponse = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: question }],
    });

    const reply = chatResponse.choices[0].message.content;
    res.json({ answer: reply });
  } catch (err) {
    console.error('Error from OpenAI:', err.message);
    res.status(500).json({ message: 'Failed to fetch AI response', error: err.message });
  }
});

app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));

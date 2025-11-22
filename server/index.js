require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json({ limit: '10mb' }));

app.post('/api/gemini', async (req, res) => {
  const apiKey = process.env.VITE_GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: { message: 'Missing Gemini API key.' } });
  }

  try {
    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=' + apiKey, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body),
    });
    const data = await response.json();
    if (!response.ok) {
      return res.status(response.status).json({ error: { message: data.error?.message || 'Gemini API error' } });
    }
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: { message: err.message || 'Server error' } });
  }
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'gemini-proxy-server' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Gemini proxy server running on port ${PORT}`);
});

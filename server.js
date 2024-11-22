import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import { getGreeting } from './lib_basic.js';
import { getQuote } from './lib_rest.js';
import { searchFaces } from './lib_aws.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Basic API's
app.get('/', (req, res) => {
  res.send('Welcome to the API!');
});

app.get('/api/hello', (req, res) => {
  // curl http://localhost:3000/api/greet/hello
  res.json({ message: 'Hello, world!' });
});

app.get('/api/greet/:name', (req, res) => {
  // curl http://localhost:3000/api/greet/John
  const name = req.params.name;
  const greetingMessage = getGreeting(name);
  res.json({ message: greetingMessage });
});

app.get('/api/greet', (req, res) => {
  // curl http://localhost:3000/api/greet?name=John
  const name = req.query.name;
  if (!name) {
    return res.status(400).json({ error: 'Name query parameter is required' });
  }
  const greetingMessage = getGreeting(name);
  res.json({ message: greetingMessage });
});

app.post('/api/greet', (req, res) => {
  // curl -X POST http://localhost:3000/api/greet -H "Content-Type: application/json" -d '{"name": "Alice"}'
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Name is required in the request body' });
  }
  const greetingMessage = getGreeting(name);
  res.json({ message: greetingMessage });
});

// API's With Back Ends
app.get('/api/quote', (req, res) => {
  // curl http://localhost:3000/api/quote?symbol=AAPL

  async function fetchQuote(symbol) {
    try {
      const result = await getQuote(symbol);
      if (result.success) {
        console.log(result.data);
        res.json(result.data);
      } else {
        console.error('Error fetching quote:', result.data);
        res.json(result.data);
      }
    } catch (error) {
      console.error('Unexpected error:', error);
      res.json(error);
    }
  }

  const { symbol } = req.query;

  if (!symbol) {
    return res.status(400).json({ error: 'Symbol is a required query parameter' });
  }

  fetchQuote(symbol);

});

// API's Using AWS SDK
app.post('/api/searchfaces', (req, res) => {
  // curl -X POST http://localhost:3000/api/searchfaces?symbol=AAPL -H "Content-Type: application/json" -d '{"image": "Alice", "collectionId": "home-collection"}'

  const { image, collectionId } = req.body;

  if (!image || !collectionId) {
    return res.status(400).json({ error: 'image and collectionId are required in the request body' });
  }

  async function fetchsearchFaces(image, collectionId) {
    try {
      const result = await searchFaces(image, collectionId);
      if (result.success) {
        console.log(result.data);
        res.json(result.data);
      } else {
        console.error('Error fetching quote:', result.data);
        res.json(result.data);
      }
    } catch (error) {
      console.error('Unexpected error:', error);
      res.json(error);
    }
  }

  if (!image || !collectionId) {
    return res.status(400).json({ error: 'image and collectionId are required body parameters' });
  }

  fetchsearchFaces(image, collectionId);

});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


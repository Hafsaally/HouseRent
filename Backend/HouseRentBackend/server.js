
const express = require('express');
const cors = require('cors');  // Install with: npm install cors

const app = express();

// Enable CORS for all routes
app.use(cors({
  origin: 'http://localhost:3000',  // Your React app's URL
  credentials: true,  // If using cookies/sessions
}));

// Your API routes
app.get('/api/customers', (req, res) => {
  res.json([{ id: 1, name: 'John Doe' }]);
});

app.listen(5000, () => console.log('Backend running on port 5000'));


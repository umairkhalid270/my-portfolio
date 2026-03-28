const express = require('express');
const app = express();
app.use(express.json());

const handler = require('./api/chat.js');
app.post('/api/chat', handler);

app.listen(3001, () => {
  console.log('API server running on port 3001');
});
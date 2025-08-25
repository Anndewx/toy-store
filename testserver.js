const express = require('express');
const app = express();

app.get('/test', (req, res) => {
  res.send('Server OK');
});

app.listen(3001, () => {
  console.log('Test server running at http://localhost:3001/test');
});

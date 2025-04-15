const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Serve the static HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/static.html'));
});

app.listen(PORT, () => {
  console.log(`Static server is running on port ${PORT}`);
});
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3456;

// Static HTML content
const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Super Basic Test</title>
  <style>
    body { font-family: Arial; padding: 20px; }
    button { padding: 10px 20px; margin: 10px; cursor: pointer; }
    .hidden { display: none; }
  </style>
</head>
<body>
  <h1>Testing Button Functionality</h1>
  
  <div id="page1">
    <h2>Page 1</h2>
    <p>This is a super basic test to see if buttons work</p>
    <button onclick="showPage('page2')">Go to Page 2</button>
  </div>
  
  <div id="page2" class="hidden">
    <h2>Page 2</h2>
    <p>If you can see this, the button click worked!</p>
    <button onclick="showPage('page1')">Go back to Page 1</button>
  </div>

  <script>
    function showPage(pageId) {
      // Hide all pages
      document.getElementById('page1').classList.add('hidden');
      document.getElementById('page2').classList.add('hidden');
      
      // Show the selected page
      document.getElementById(pageId).classList.remove('hidden');
    }
  </script>
</body>
</html>
`;

// Serve the static HTML
app.get('/', (req, res) => {
  res.send(htmlContent);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Pure HTML test server running at http://localhost:${PORT}`);
});
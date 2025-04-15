const express = require('express');
const app = express();
const PORT = 3000;

// HTML content to serve
const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Super Basic Button Test</title>
  <style>
    body { 
      font-family: Arial, sans-serif; 
      max-width: 800px; 
      margin: 0 auto; 
      padding: 20px; 
    }
    .container {
      border: 1px solid #ddd;
      border-radius: 8px;
      padding: 20px;
      margin-top: 20px;
    }
    .hidden { 
      display: none; 
    }
    button {
      background-color: #4285f4;
      color: white;
      border: none;
      padding: 10px 15px;
      border-radius: 4px;
      cursor: pointer;
      margin: 10px 0;
    }
    .back-btn {
      background-color: #f1f1f1;
      color: #333;
    }
    h1, h2 {
      color: #333;
    }
  </style>
</head>
<body>
  <h1>Labor Market Research</h1>
  
  <div id="main-page" class="container">
    <h2>Select Report Type</h2>
    <p>Please select one of the following report types:</p>
    <button onclick="goToPage('workforce-page')">Workforce Reports</button>
    <button onclick="goToPage('consulting-page')">Consulting Reports</button>
  </div>
  
  <div id="workforce-page" class="container hidden">
    <h2>Workforce Reports</h2>
    <p>Here are the available workforce reports:</p>
    <button class="back-btn" onclick="goToPage('main-page')">Back to Main</button>
    <div>
      <h3>Strategic Sourcing</h3>
      <p>Identify optimal locations for expanding your workforce.</p>
      <button onclick="alert('Selected Strategic Sourcing')">Select This Report</button>
    </div>
  </div>
  
  <div id="consulting-page" class="container hidden">
    <h2>Consulting Reports</h2>
    <p>Here are the available consulting projects:</p>
    <button class="back-btn" onclick="goToPage('main-page')">Back to Main</button>
    <div>
      <h3>Custom Research</h3>
      <p>Tailored analysis for your specific business needs.</p>
      <button onclick="alert('Selected Custom Research')">Select This Project</button>
    </div>
  </div>

  <script>
    function goToPage(pageId) {
      // Hide all pages
      document.getElementById('main-page').classList.add('hidden');
      document.getElementById('workforce-page').classList.add('hidden');
      document.getElementById('consulting-page').classList.add('hidden');
      
      // Show selected page
      document.getElementById(pageId).classList.remove('hidden');
    }
  </script>
</body>
</html>
`;

// Serve the HTML content
app.get('/', (req, res) => {
  res.send(htmlContent);
});

// Start the server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Simple HTML server running at http://localhost:${PORT}`);
});
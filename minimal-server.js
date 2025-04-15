import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the static HTML file
const htmlContent = fs.readFileSync(path.join(__dirname, 'client/static.html'), 'utf8');

// Create HTTP server
const server = http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end(htmlContent);
});

// Start the server on port 5001
const PORT = 5001;
server.listen(PORT, () => {
  console.log(`Minimal server running at http://localhost:${PORT}`);
});
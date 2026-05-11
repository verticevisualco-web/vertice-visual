const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const PUBLIC_DIR = path.join(__dirname, 'public');

const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.JPG': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
};

const server = http.createServer((req, res) => {
  let urlPath = req.url === '/' ? '/index.html' : req.url;
  // Strip query strings
  urlPath = urlPath.split('?')[0];
  // Decode percent-encoded characters (spaces, tildes, Spanish chars, etc.)
  try { urlPath = decodeURIComponent(urlPath); } catch(e) {}

  const filePath = path.join(PUBLIC_DIR, urlPath);
  const ext = path.extname(filePath).toLowerCase();
  const contentType = mimeTypes[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, data) => {
    if (err) {
      if (err.code === 'ENOENT') {
        // Try serving index.html for unknown routes
        fs.readFile(path.join(PUBLIC_DIR, 'index.html'), (err2, data2) => {
          if (err2) {
            res.writeHead(404);
            res.end('404 Not Found');
          } else {
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end(data2);
          }
        });
      } else {
        res.writeHead(500);
        res.end('Server Error');
      }
      return;
    }
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log('');
  console.log('  ▲ VÉRTICE VISUAL — Servidor local activo');
  console.log('');
  console.log(`  🌐  http://localhost:${PORT}`);
  console.log('');
  console.log('  Páginas disponibles:');
  console.log(`  → Home:      http://localhost:${PORT}/`);
  console.log(`  → Proyectos: http://localhost:${PORT}/proyectos.html`);
  console.log(`  → Rental:    http://localhost:${PORT}/rental.html`);
  console.log(`  → Nosotros:  http://localhost:${PORT}/nosotros.html`);
  console.log(`  → Contacto:  http://localhost:${PORT}/contacto.html`);
  console.log('');
  console.log('  Presiona Ctrl+C para detener el servidor.');
  console.log('');
});

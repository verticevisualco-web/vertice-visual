const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = path.join(__dirname, 'public');

const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.mp4': 'video/mp4',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
};

const securityHeaders = {
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
};

function send(res, status, headers, body) {
  res.writeHead(status, { ...securityHeaders, ...headers });
  res.end(body);
}

const server = http.createServer((req, res) => {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    return send(res, 405, { Allow: 'GET, HEAD' }, 'Method Not Allowed');
  }

  let urlPath = req.url.split('?')[0].split('#')[0];
  try { urlPath = decodeURIComponent(urlPath); } catch (e) {
    return send(res, 400, {}, 'Bad Request');
  }
  if (urlPath.includes('\0')) return send(res, 400, {}, 'Bad Request');
  if (urlPath.endsWith('/')) urlPath += 'index.html';

  // Resolver y verificar que el archivo quede DENTRO de /public (evita ../ traversal)
  const filePath = path.normalize(path.join(PUBLIC_DIR, urlPath));
  if (filePath !== PUBLIC_DIR && !filePath.startsWith(PUBLIC_DIR + path.sep)) {
    return send(res, 403, {}, '403 Forbidden');
  }

  const ext = path.extname(filePath).toLowerCase();
  const isPage = ext === '' || ext === '.html';

  fs.readFile(filePath, (err, data) => {
    if (err) {
      if (err.code === 'ENOENT' || err.code === 'EISDIR') {
        // 404 real; solo las rutas de página muestran la home, los recursos (img, json...) no
        if (isPage) {
          return fs.readFile(path.join(PUBLIC_DIR, 'index.html'), (err2, home) => {
            if (err2) return send(res, 404, {}, '404 Not Found');
            send(res, 404, { 'Content-Type': mimeTypes['.html'] }, home);
          });
        }
        return send(res, 404, {}, '404 Not Found');
      }
      return send(res, 500, {}, 'Server Error');
    }
    // HTML/CSS/JS siempre frescos; imágenes y demás recursos cacheables
    const cache = ['.html', '.css', '.js'].includes(ext) ? 'no-cache' : 'public, max-age=86400';
    send(res, 200, {
      'Content-Type': mimeTypes[ext] || 'application/octet-stream',
      'Content-Length': data.length,
      'Cache-Control': cache,
    }, req.method === 'HEAD' ? undefined : data);
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

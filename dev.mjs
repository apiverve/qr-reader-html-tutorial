// Local development: serves the page and runs the api/ functions, the way Vercel does once
// deployed. Run it with `npm run dev`. Vercel ignores this file.
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, resolve, sep } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { handleApi } from './lib/dev-api.js';

const ROOT = fileURLToPath(new URL('.', import.meta.url));
const PORT = Number(process.env.PORT) || 3000;
const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

createServer(async (req, res) => {
  try {
    if (req.url.startsWith('/api/')) {
      // A fresh import each time, so an edited handler takes effect without a restart.
      return await handleApi(req, res, (path) => import(`${pathToFileURL(join(ROOT, path)).href}?t=${Date.now()}`));
    }
    const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    const file = resolve(ROOT, `.${pathname.endsWith('/') ? `${pathname}index.html` : pathname}`);
    if (!file.startsWith(ROOT.replace(/[\\/]$/, '') + sep)) throw Object.assign(new Error('Not found'), { code: 'ENOENT' });
    const body = await readFile(file);
    res.writeHead(200, { 'Content-Type': TYPES[extname(file)] || 'application/octet-stream' }).end(body);
  } catch (err) {
    res.writeHead(err.code === 'ENOENT' ? 404 : 500).end(err.code === 'ENOENT' ? 'Not found' : 'Server error');
  }
}).listen(PORT, () => console.log(`Running at http://localhost:${PORT}`));

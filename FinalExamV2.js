const http = require('http');
const fs = require('fs');
const path = require('path');

const baseDir = path.resolve('C:/Users/LeoneJM/VSC');
const defaultPage = '/html/Lectures/FinalSchedule.html';

const mimeTypes = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
    const requestedPath = req.url === '/' ? defaultPage : req.url;
    const safePath = path.normalize(decodeURIComponent(requestedPath)).replace(/^\\+|^\/+/, '');
    const filePath = path.join(baseDir, safePath);

    // Prevent path traversal outside workspace root.
    if (!filePath.startsWith(baseDir)) {
        res.writeHead(403, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end('Forbidden');
        return;
    }

    fs.readFile(filePath, (err, data) => {
        if (err) {
            const statusCode = err.code === 'ENOENT' ? 404 : 500;
            res.writeHead(statusCode, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end(statusCode === 404 ? 'File not found' : 'Server error');
            return;
        }

        const ext = path.extname(filePath).toLowerCase();
        const contentType = mimeTypes[ext] || 'application/octet-stream';
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(data);
    });
});

const port = Number(process.env.PORT) || 3000;

server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
    console.log(`Open http://localhost:${port}/html/Lectures/FinalSchedule.html`);
});
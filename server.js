const fs = require('fs');
const http = require('http');
const mathUtils = require('./mathUtils');

const server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<h1>Math Utils</h1>');
    res.write('<p>500 + 300 = ' + mathUtils.add(500, 300) + '</p>');
    res.write('<p>400 - 100 = ' + mathUtils.subtract(400, 100) + '</p>');
    res.write('<p>61 * 75 = ' + mathUtils.multiply(61, 75) + '</p>');
    res.end();
});

server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'text/html');
    fs.readFile('C:\\Users\\LeoneJM\\VSC\\html\\Lectures\\FinalSchedule.html', 'utf8', (err, data) => {
        if (err) {
            console.log(err);
            res.end('<h1>Error loading schedule</h1>');
        } else {
            res.end(data);
        }   });
});

server.listen(3001, () => {
    console.log('Server running on port 3001');
});
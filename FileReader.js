const fs = require('fs');
// Read a file and display its contents
const filePath = 'test.txt'; // Change this to your file path

fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }
    
    console.log('File contents: \n"' + data + '"');
});

const fs = require('fs');
const http = require('http');
const path = require('path');

const server = http.createServer((req, res) => {
    if (req.method === 'GET' && req.url === '/readfile') {
        const filePath = path.join(__dirname, 'example.txt');
        fs.readFile(filePath, (err, data) => {
            if (err) {
                console.log(err)
                res.statusCode = 500;
                res.end('Error reading file');
                return;
            }

            const buffer = Buffer.from(data);
            const modifiedData = buffer.toString('utf8').toUpperCase();

            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end(modifiedData);
        });
    } else if (req.method === 'POST' && req.url === '/writefile') {
        const dataToWrite = 'This is the new content added to the file.';
        const bufferToWrite = Buffer.from(dataToWrite);

        const filePath = path.join(__dirname, 'output.txt');

        fs.writeFile(filePath, bufferToWrite, (err) => {
            if (err) {
                res.statusCode = 500;
                res.end('Error writing file');
                return;
            }

            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('File has been written successfully.');
        });
    } else if (req.url === '/streamfile') {
        const filePath = path.join(__dirname, 'example.txt');
        const streamedFilePath = path.join(__dirname, 'streamed_output.txt');

        const readStream = fs.createReadStream(filePath);
        const writeStream = fs.createWriteStream(streamedFilePath);

        readStream.pipe(writeStream);

        readStream.on('end', () => {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('File has been streamed and written successfully.');
        });

        readStream.on('error', (err) => {
            res.statusCode = 500;
            res.end('Error reading file');
        });
    } else {
        res.statusCode = 404;
        res.end('Not Found');
    }
});

server.listen(3000, () => {
    console.log('Server running at http://localhost:3000/');
});

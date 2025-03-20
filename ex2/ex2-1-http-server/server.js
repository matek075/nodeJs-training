// Exercise 2.1: Basic HTTP Server

const http = require('http');

const simpleServer = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello World');

    // Implement your routing logic here
    // Hint: use req.url to determine the requested path
});

// Uncomment the line below to start the simple server
// simpleServer.listen(3000, () => console.log('Server running on port 3000'));

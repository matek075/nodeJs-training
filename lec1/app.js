const http = require('http');

function generateRandomId() {
    return Math.floor(Math.random() * 1000);
}

const server = http.createServer((req, res) => {
    if (req.method === 'POST' && req.url === '/create') {
        let body = '';

        req.on('data', (chunk) => {
            body += chunk.toString();
        });

        req.on('end', () => {
            try {
                const data = JSON.parse(body);

                if (!data.name || !data.age) {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    return res.end(JSON.stringify({ error: 'Missing name or age' }));
                }

                const newItem = {
                    id: generateRandomId(),
                    name: data.name,
                    age: data.age,
                };

                res.writeHead(201, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify(newItem));
            } catch (error) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ error: 'Invalid JSON format' }));
            }
        });

        return;
    }

    else if (req.method === 'GET' && req.url.startsWith('/item/')) {
        const id = req.url.split('/')[2];
        console.log(`Received GET request for item with ID: ${id}`);

        const item = {
            id: id,
            name: 'Sample Item',
            description: 'This is a sample item for demonstration purposes.',
        };

        res.writeHead(200, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify(item));
    }

    else if (req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        return res.end('Hello, Node.js! Welcome to the server.');
    }

    else if (req.url === '/about') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        return res.end('This is the About page.');
    }

    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 Not Found');
});

server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});

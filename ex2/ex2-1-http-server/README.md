# Exercise 2.1: Basic HTTP Server

In this exercise, you'll create a simple HTTP server using Node.js.

## Tasks

1. Create a basic HTTP server that listens on port 3000
2. The server should respond with "Hello World" for all requests
3. Extend the server to respond differently based on URL paths:
   - `/` should return "Home Page"
   - `/about` should return "About Page"
   - `/contact` should return "Contact Page"
   - Any other path should return "404 Not Found"

## Instructions

1. Implement your solution in `server.js`
2. Start your server using `node server.js`
3. Test using a browser or tools like curl/Postman

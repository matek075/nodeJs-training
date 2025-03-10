const express = require('express');
const app = express();
app.use(express.json());

let tasks = [];
let idCounter = 1;

// 1. Add a new task
app.post('/tasks', (req, res) => {
    // TODO: Implement this function
    // - Check if `title` and `description` are present in the request body
    // - Create a new task with a unique `id`, `title`, `description`, and `completed: false`
    // - Add the task to the `tasks` array
    // - Return the new task in the response with status code 201
});

// 2. Get all tasks
app.get('/tasks', (req, res) => {
    // TODO: Implement this function
    // - Return all tasks from the `tasks` array
});

// 3. Mark a task as completed
app.put('/tasks/:id/complete', (req, res) => {
    // TODO: Implement this function
    // - Find the task with the given `id` in the `tasks` array
    // - If the task does not exist, return a 404 error
    // - Mark the task as completed (`completed: true`)
    // - Return the updated task in the response
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
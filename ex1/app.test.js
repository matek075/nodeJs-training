const request = require('supertest');
const app = require('./app');

describe('Task Manager API', () => {
    // Clear the tasks array before each test
    beforeEach(() => {
        app.tasks = [];
        app.idCounter = 1;
    });

    // Test 1: Get all tasks
    it('should get all tasks', async () => {
        // Add a sample task
        await request(app)
            .post('/tasks')
            .send({ title: 'Task 1', description: 'Description 1' });

        const res = await request(app).get('/tasks');
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBeTruthy();
        expect(res.body.length).toBe(1);
        expect(res.body[0].title).toEqual('Task 1');
    });

    // Test 2: Add a new task
    it('should add a new task', async () => {
        const res = await request(app)
            .post('/tasks')
            .send({ title: 'Learn Node.js', description: 'Complete the Node.js course' });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('id');
        expect(res.body.title).toEqual('Learn Node.js');
        expect(res.body.description).toEqual('Complete the Node.js course');
        expect(res.body.completed).toBe(false);
    });

    // Test 3: Mark a task as completed
    it('should mark a task as completed', async () => {
        // Add a sample task
        const taskRes = await request(app)
            .post('/tasks')
            .send({ title: 'Task 1', description: 'Description 1' });

        const taskId = taskRes.body.id;

        // Mark the task as completed
        const res = await request(app).put(`/tasks/${taskId}/complete`);
        expect(res.statusCode).toEqual(200);
        expect(res.body.completed).toBe(true);
    });

    // Test 4: Return 404 if task to complete does not exist
    it('should return 404 if task to complete does not exist', async () => {
        const res = await request(app).put('/tasks/999/complete');
        expect(res.statusCode).toEqual(404);
        expect(res.body.error).toEqual('Task not found');
    });
});
const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const Task = require('../models/Task.model');

beforeAll(async () => {
    await mongoose.connect('mongodb://localhost:27017/testDB', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe('Task Controller - Complex Tests', () => {
    beforeEach(async () => {
        await Task.deleteMany({});
    });

    test('Create and Retrieve Multiple Tasks', async () => {
        const tasksToCreate = [
            { title: 'Task A', description: 'Description A', date: '2024-01-01', status: 'TODO' },
            { title: 'Task B', description: 'Description B', date: '2024-01-02', status: 'DONE' },
            { title: 'Task C', description: 'Description C', date: '2024-01-03', status: 'IN_PROGRESS' },
        ];

        await Promise.all(
            tasksToCreate.map(async (task) => {
                await request(app).post('/api/tasks').send(task);
            })
        );

        const response = await request(app).get('/api/tasks');

        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(tasksToCreate.length);
    });

    test('Create Task and Update Status', async () => {
        const newTask = {
            title: 'New Task',
            description: 'This is a new task.',
            date: '2024-01-04',
            status: 'TODO',
        };

        const createResponse = await request(app).post('/api/tasks').send(newTask);

        expect(createResponse.status).toBe(201);
        expect(createResponse.body.title).toBe('New Task');

        const taskId = createResponse.body._id;
        const updateStatusResponse = await request(app)
            .put(`/api/tasks/updateStatus`)
            .send({ taskId: taskId, newStatus: 'DONE' });

        expect(updateStatusResponse.status).toBe(200);
        expect(updateStatusResponse.body.message).toBe('Status updated successfully');

        // Retrieve the updated task
        const getUpdatedTaskResponse = await request(app).get(`/api/tasks/${taskId}`);

        expect(getUpdatedTaskResponse.status).toBe(200);
        expect(getUpdatedTaskResponse.body.status).toBe('DONE');
        // Add more assertions based on your expected data
    });
});

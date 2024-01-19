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

describe('Task Controller - getAllTasks', () => {
    beforeEach(async () => {
        await Task.deleteMany({});
    });

    test('Get All Tasks - Empty List', async () => {
        const response = await request(app).get('/api/tasks');

        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(0);
    });

    test('Get All Tasks - Non-empty List', async () => {
        await Task.create([
            { title: 'Task 1', description: 'Description 1', date: '2024-01-01', status: 'TODO' },
            { title: 'Task 2', description: 'Description 2', date: '2024-01-02', status: 'DONE' },
        ]);

        const response = await request(app).get('/api/tasks');

        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(2);
    });
});

describe('Task Controller - createTask', () => {
    test('Create Task - Valid Input', async () => {
        const newTask = {
            title: 'New Task',
            description: 'This is a new task.',
            date: '2024-01-03',
            status: 'TODO',
        };

        const response = await request(app)
            .post('/api/tasks')
            .send(newTask);

        expect(response.status).toBe(201);
        expect(response.body.title).toBe('New Task');
        expect(response.body.description).toBe('This is a new task.');
    });

    test('Create Task - Invalid Input', async () => {
        const invalidTask = {
            title: '',
            description: 'Invalid Task',
            date: '2024-01-04',
            status: 'TODO',
        };

        const response = await request(app)
            .post('/api/tasks')
            .send(invalidTask);

        expect(response.status).toBe(500);
        expect(response.body.error).toBeTruthy();

    });
});

// __tests__/server.test.js
const request = require('supertest');
const app = require('../app.js');

describe('Server API', () => {
    test('Health Check', async () => {
        const response = await request(app).get('/health');
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Server is healthy');
    });

});

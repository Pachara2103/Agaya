const request = require('supertest');
const { connect, closeDatabase, clearDatabase } = require('./db');
const mongoose = require('mongoose'); 
const app = require('../../app'); 
const User = require('../../models/user'); 

const BASE_URL = '/api/v1/agaya/auth';

const userCredentials = {
    email: 'integration_real_db@test.com',
    password: 'RealDBTest123',
    dateOfBirth: '1990-01-01',
    gender: 'male',
};

beforeAll(async () => {
    await connect();
});

afterEach(async () => {
    await clearDatabase();
});

afterAll(async () => {
    await clearDatabase();
    await mongoose.connection.close(); 
});

describe('Auth Integration Tests', () => {

    describe(`POST ${BASE_URL}/register`, () => {
        it('should register a new user, return a token cookie, and a 201 status', async () => {
            const response = await request(app)
                .post(`${BASE_URL}/register`)
                .send(userCredentials)
                .expect('Content-Type', /json/)
                .expect(201);

            expect(response.body.success).toBe(true);
            expect(response.body).toHaveProperty('token');
            expect(response.headers['set-cookie']).toBeDefined();
            
            const userInDB = await User.findOne({ email: userCredentials.email });
            expect(userInDB).not.toBeNull();
            expect(userInDB.email).toBe(userCredentials.email);
            const isMatch = await userInDB.matchPassword(userCredentials.password);
            expect(isMatch).toBe(true);
        });

        it('should return 409 if the email is already registered', async () => {
            await request(app).post(`${BASE_URL}/register`).send(userCredentials).expect(201);

            const response = await request(app)
                .post(`${BASE_URL}/register`)
                .send(userCredentials)
                .expect('Content-Type', /json/)
                .expect(409);

            expect(response.body.success).toBe(false);
            expect(response.body.message).toBe('This email is already registered.');
        });
    });

    describe(`POST ${BASE_URL}/login`, () => {
        beforeEach(async () => {
            await request(app).post(`${BASE_URL}/register`).send(userCredentials);
        });

        it('should successfully log in and return a token cookie with 200 status', async () => {
            const response = await request(app)
                .post(`${BASE_URL}/login`)
                .send({ email: userCredentials.email, password: userCredentials.password })
                .expect('Content-Type', /json/)
                .expect(200);

            expect(response.body.success).toBe(true);
            expect(response.body).toHaveProperty('token');
            expect(response.headers['set-cookie']).toBeDefined();
        });

        it('should return 401 for incorrect password', async () => {
            const response = await request(app)
                .post(`${BASE_URL}/login`)
                .send({ email: userCredentials.email, password: 'WrongPassword123' })
                .expect('Content-Type', /json/)
                .expect(401);

            expect(response.body.success).toBe(false);
            expect(response.body.message).toContain('Invalid credentials.');
        });
    });
});
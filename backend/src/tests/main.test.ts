import { afterAll, describe, expect, test } from 'vitest';
import supertest from 'supertest';
import { createDatabasePool } from '../db';
import app, { server } from '../main';

describe('Server tests', () => {
  afterAll(() => {
    server.close();
  });
  test('Verify database connection', async () => {
    const initializeClient = createDatabasePool();
    const client = await initializeClient.connect();
    expect(client).toBeTruthy();
    client.release();
  });
  test('Server response', async () => {
    const response = await supertest(app).get('/');
    expect(response.status).toBe(200);
  });
});

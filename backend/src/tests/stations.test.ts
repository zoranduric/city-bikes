import { afterAll, describe, expect, test } from 'vitest';
import supertest from 'supertest';
import app, { server } from '../main';

describe('Station tests', () => {
  afterAll(() => {
    server.close();
  });
  test('Return number of stations and ensure it is greater than 0', async () => {
    const response = await supertest(app).get('/stations/count');
    expect(response.status).toBe(200);
    expect(parseInt(response.text)).toBeGreaterThan(0);
  });
});

import { afterAll, describe, expect, test } from 'vitest';
import supertest from 'supertest';
import app, { server } from '../main';
import { Stations } from '../stations/schema';

describe('Station tests', () => {
  afterAll(() => {
    server.close();
  });
  test('Return number of stations and ensure it is greater than 0', async () => {
    const response = await supertest(app).get('/stations/count');
    expect(response.status).toBe(200);
    expect(parseInt(response.text)).toBeGreaterThan(0);
  });
  test('Fetch a list of stations and ensure it contains at least one station', async () => {
    const response = await supertest(app).get('/stations').query({ skip: 0, take: 10 });
    expect(response.status).toBe(200);
    const responseBody = response.body as Stations[];
    expect(responseBody.length).toBeGreaterThan(0);
  });
  test('Return an error when incorrect query parameters are provided', async () => {
    const response = await supertest(app).get('/stations').query({ skip: 0, take: 11 });
    expect(response.status).toBe(400);
  });
});

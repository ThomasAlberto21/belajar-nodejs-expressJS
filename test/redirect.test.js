import express from 'express';
import request from 'supertest';

test('Response Test', async () => {
  const app = express();
  app.get('/', (req, res) => {
    res.redirect('/hello');
    // res.redirect('/hello/world');
  });

  const response = await request(app).get('/');
  expect(response.status).toBe(302);
  expect(response.get('location')).toBe('/hello');
  // expect(response.get('location')).toBe('/hello/world');
});

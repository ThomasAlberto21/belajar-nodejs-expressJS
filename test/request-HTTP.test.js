import express from 'express';
import request from 'supertest';

test('Request Http Test', async () => {
  const app = express();
  app.get('/', (req, res) => {
    res.send(`Hello ${req.query.name}`);
  });

  const response = await request(app)
    .get('/')
    .query({ name: 'Thomas Alberto' });

  expect(response.text).toEqual('Hello Thomas Alberto');
});
